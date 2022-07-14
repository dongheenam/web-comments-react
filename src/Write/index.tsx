/*
 * IDEAS:
 *   - putting a button next to each generated comment to change its "strength"
 *   - calculating effort grade using the traits and strength
 */

import React, { useState } from "react";
import Explanation from "../components/Explanation";
import { traitsList } from "../Comments";
import type { Gender, Comment } from "../Comments";
import Options from "./Options";
import Select from "./Select";
import Results from "./Results";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useFirebase } from "../firebase";

export interface TopicSkill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}
export type TraitsStatus = {
  [key in keyof typeof traitsList]: number;
};

export default function Write() {
  /* for debugging */
  const [appStatus, setAppStatus] = useState<string>();

  /* gender input */
  const [gender, setGender] = useState<Gender>("male");
  function handleGenderChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setGender(value as Gender);
  }

  /* topics and skills input */
  const initialTopicSkill: TopicSkill = { name: "", level: 3 };
  const [topics, setTopics] = useState<Array<TopicSkill>>([
    { ...initialTopicSkill },
    { ...initialTopicSkill },
  ]);
  const [skills, setSkills] = useState<Array<TopicSkill>>([
    { ...initialTopicSkill },
    { ...initialTopicSkill },
  ]);
  // name changes
  function handleTopicSkillNameChange({
    target,
  }: React.ChangeEvent<HTMLInputElement>) {
    let newList, setList;
    if (target.id.slice(0, 5) === "topic") {
      newList = [...topics];
      setList = setTopics;
    } else {
      newList = [...skills];
      setList = setSkills;
    }
    const idx = parseInt(target.id.slice(-1));
    newList[idx] = {
      ...newList[idx],
      name: target.value,
    };
    setList(newList);
  }
  // level changes

  /* traits input */
  /* traitsStatus = {
   *   [trait-id]: 0 (negative) | 1 (indeterminate) | 2 (positive),
   *   ...
   * }
   * default is always "indeterminate"
   */
  const defaultStatus = Object.fromEntries(
    Object.entries(traitsList).map(([key, _val]) => [key, 1])
  ) as TraitsStatus;
  const [traitsStatus, setTraitsStatus] = useState<TraitsStatus>(defaultStatus);
  function handleTraitsChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setTraitsStatus({
      ...traitsStatus,
      [target.id]: (traitsStatus[target.id as keyof TraitsStatus] + 1) % 3,
    });
  }

  /* fetching the comments */
  const [commentList, setCommentList] = useState<Array<Comment>>([]);
  const db = useFirebase().db;
  async function fetchComments() {
    let appStatus = "fetching the comments... ";
    setAppStatus(appStatus);
    // filtering positive and negative traits
    const positiveTraits = Object.entries(traitsStatus)
      .filter(([_key, val]) => val === 2)
      .map(([key, _val]) => key);
    const negativeTraits = Object.entries(traitsStatus)
      .filter(([_key, val]) => val === 0)
      .map(([key, _val]) => key);

    if (positiveTraits.length + negativeTraits.length === 0) {
      alert("Select at least one positive or negative traits!");
      setAppStatus("failed fetch (0 traits selected)");
      return;
    }

    appStatus +=
      `with positive traits [${positiveTraits.join(", ")}], ` +
      `negative traits [${negativeTraits.join(", ")}]... `;
    setAppStatus(appStatus);

    // queries targeting the traits
    const commentsCollection = collection(db, "comments");
    const qPositive = query(
      commentsCollection,
      where("trait", "in", positiveTraits),
      where("tone", "==", "+")
    );
    const qNegative = query(
      commentsCollection,
      where("trait", "in", negativeTraits),
      where("tone", "==", "-")
    );
    const querySnapshots = await Promise.all([
      getDocs(qPositive),
      getDocs(qNegative),
    ]);
    const comments = querySnapshots.map((qS) =>
      qS.docs.map((doc) => doc.data() as Comment)
    );

    setCommentList(comments.flat(1));
    appStatus +=
      `loaded ${comments[0].length} positive comment(s) ` +
      `and ${comments[1].length} negative comment(s)!`;
    setAppStatus(appStatus);
  }

  /* states to be passed onto */
  const genderState = { gender, handleGenderChange };
  const topicSkillState = { topics, skills, handleTopicSkillNameChange };
  const traitsState = { traitsStatus, handleTraitsChange };
  const commentsState = { commentList, fetchComments };

  /* render JSX */
  return (
    <>
      <h1>Comment maker</h1>
      <Options
        genderState={genderState}
        topicSkillState={topicSkillState}
        traitsState={traitsState}
        commentsState={commentsState}
      />

      <hr />
      <Results genderState={genderState} commentsState={commentsState} />

      <hr />

      <details>
        <summary className="text-base text-gray-500">Show geeky stuff</summary>
        <div className="grid grid-flow-row">
          <Explanation>Status: {appStatus}</Explanation>
          <Explanation>Gender: {gender}</Explanation>
          <Explanation>Topics: {JSON.stringify(topics)}</Explanation>
          <Explanation>Skills: {JSON.stringify(skills)}</Explanation>
          <Explanation>Traits: {JSON.stringify(traitsStatus)}</Explanation>
          <Explanation>Comments: {JSON.stringify(commentList)}</Explanation>
        </div>
      </details>
    </>
  );
}
