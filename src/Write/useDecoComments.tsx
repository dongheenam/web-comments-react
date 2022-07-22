import { useEffect, useState } from "react";

import { makePronouns, Trait } from "../Comments";
import type { Comment, Gender } from "../Comments";
import { choice } from "../util";
import { TopicSkill } from "./useTopicSkills";

interface UseDecoCommentsProps {
  gender: Gender;
  topics: Array<TopicSkill>;
  skills: Array<TopicSkill>;
  fetchedComments: Array<Comment>;
}

export interface UseDecoComments {
  sortedComments: SortedComments;
  setChosenComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  decoratedComments: Array<string>;
}

export type SortedComments = {
  [tone in "+" | "-"]: {
    [trait in Trait]?: Array<Comment>;
  };
};

export default function useDecoComments({
  gender,
  topics,
  skills,
  fetchedComments,
}: UseDecoCommentsProps): UseDecoComments {
  // sort the comments by trait and tone
  const defaultSorted: SortedComments = { "+": {}, "-": {} };
  const [sortedComments, setSortedComments] =
    useState<SortedComments>(defaultSorted);
  function sortComments(comments: Array<Comment>): SortedComments {
    const sortedComments = { ...defaultSorted };

    comments.map((comment) => {
      const trait = comment.trait;
      const tone = comment.tone;
      if (!trait || !tone) {
        return;
      }

      if (trait in sortedComments[tone]) {
        sortedComments[tone][trait]?.push(comment);
      } else {
        sortedComments[tone][trait] = [comment];
      }
    });

    return sortedComments;
  }
  useEffect(() => {
    setSortedComments(sortComments(fetchedComments));
  }, [fetchedComments]);

  // comments chosen automatically or by user
  const [chosenComments, setChosenComments] = useState<Array<Comment>>([]);
  useEffect(() => {
    if (!sortedComments) return;

    const positivePool = Object.values(sortedComments["+"]).map(
      (comments) => choice(comments)[0]
    );
    const negativePool = Object.values(sortedComments["-"]).map(
      (comments) => choice(comments)[0]
    );

    setChosenComments([...choice(positivePool, 6), ...choice(negativePool, 6)]);
  }, [sortedComments]);

  /* populate the pronouns */
  function genderComment(commentText: string) {
    const pronouns = makePronouns(gender);
    return commentText
      .replaceAll(/<subject>/g, pronouns.subject)
      .replaceAll(/<object>/g, pronouns.object)
      .replaceAll(/<possessive>/g, pronouns.possessive)
      .replaceAll(/<reflexive>/g, pronouns.reflexive);
  }

  /* populate the topics and skills */
  function topicifyComment(commentText: string) {
    let newText = commentText;

    // chooses a random topic or skill with matching status and return its name
    function replaceWith(topicSkills: Array<TopicSkill>, status: number) {
      const item = choice(
        topicSkills.filter((item) => item.status === status)
      )[0];
      return "$1" + item.name || "";
    }
    // adds "-ing" at the end of the first word
    function addIng(phrase: string) {
      return phrase.replace(/^(\$1\w+)\b(.*)/, "$1-ing$2");
    }

    // regular expressions
    const pTopicReg = /(^\+.*)<topic>/;
    const nTopicReg = /(^-.*)<topic>/;
    const pSkillReg = /(^\+.*)<skill>/;
    const nSkillReg = /(^-.*)<skill>/;
    const pSkillingReg = /(^\+.*)<skill-ing>/;
    const nSkillingReg = /(^-.*)<skill-ing>/;

    if (pTopicReg.test(newText)) {
      newText = newText.replace(pTopicReg, replaceWith(topics, 2));
    }
    if (nTopicReg.test(newText)) {
      newText = newText.replace(nTopicReg, replaceWith(topics, 0));
    }
    if (pSkillReg.test(newText)) {
      newText = newText.replace(pSkillReg, replaceWith(skills, 2));
    }
    if (nSkillReg.test(newText)) {
      newText = newText.replace(nSkillReg, replaceWith(skills, 0));
    }
    if (pSkillingReg.test(newText)) {
      newText = newText.replace(pSkillingReg, addIng(replaceWith(skills, 2)));
    }
    if (nSkillingReg.test(newText)) {
      newText = newText.replace(nSkillingReg, addIng(replaceWith(skills, 0)));
    }

    return newText;
  }

  /* add the strength of the comment (not implemented yet) */
  function strengthifyComment(commentText: string) {
    return commentText
      .replace(/<strength>/, "excellent")
      .replace(/<frequency>/, "always");
  }

  const [decoratedComments, setDecoratedComments] = useState<Array<string>>([]);
  useEffect(() => {
    if (!chosenComments) return;
    setDecoratedComments(
      chosenComments
        .map((comment) => `${comment.tone} ${comment.text}`)
        .map((text) => genderComment(text))
        .map((text) => topicifyComment(text))
        .map((text) => strengthifyComment(text))
    );
  }, [gender, chosenComments]);

  return { sortedComments, setChosenComments, decoratedComments };
}
