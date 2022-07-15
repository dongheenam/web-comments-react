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
  decoratedComments: Array<string>;
}

export default function useDecoComments({
  gender,
  topics,
  skills,
  fetchedComments,
}: UseDecoCommentsProps): UseDecoComments {
  const [decoratedComments, setDecoratedComments] = useState<Array<string>>([]);

  /* limit the number of comments to show */
  function limitComment(comments: Array<Comment>): Array<Comment> {
    if (comments.length < 13) {
      return comments;
    }

    const positiveCommentsByTrait: {
      [trait in Trait]?: Array<Comment>;
    } = {};
    const negativeCommentsByTrait: {
      [trait in Trait]?: Array<Comment>;
    } = {};

    comments.map((comment) => {
      const trait = comment.trait;
      if (!trait) {
        return;
      }

      const commentsListBucket =
        comment.tone === "+"
          ? positiveCommentsByTrait
          : negativeCommentsByTrait;

      if (trait in commentsListBucket) {
        commentsListBucket[trait]!.push(comment);
      } else {
        commentsListBucket[trait] = [comment];
      }
    });

    const positiveCommentsPool = Object.values(positiveCommentsByTrait)
      .map((comments) => choice(comments, 2))
      .flat(1);
    const negativeCommentsPool = Object.values(negativeCommentsByTrait)
      .map((comments) => choice(comments, 2))
      .flat(1);

    return [
      ...(choice(positiveCommentsPool, 6) as Array<Comment>),
      ...(choice(negativeCommentsPool, 6) as Array<Comment>),
    ];
  }

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
  function topicSkillComment(commentText: string) {
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
    const nTopicReg = /(^\-.*)<topic>/;
    const pSkillReg = /(^\+.*)<skill>/;
    const nSkillReg = /(^\-.*)<skill>/;
    const pSkillingReg = /(^\+.*)<skill-ing>/;
    const nSkillingReg = /(^\-.*)<skill-ing>/;

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

  useEffect(() => {
    const limitedComments = limitComment(fetchedComments);
    setDecoratedComments(
      limitedComments
        .map((comment) => `${comment.tone} ${comment.text}`)
        .map((text) => genderComment(text))
        .map((text) => topicSkillComment(text))
    );
  }, [gender, fetchedComments]);

  return { decoratedComments };
}
