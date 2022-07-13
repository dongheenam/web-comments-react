/*
 * IDEAS:
 *   - putting a button next to each generated comment to change its "strength"
 *   - calculating effort grade using the traits and strength
 */

import React, { useState } from "react";
import Explanation from "../components/Explanation";
import { traitsList } from "../Comments";
import type { Gender } from "../Comments";
import Options from "./Options";
import Button from "../components/Button";
import Select from "./Select";
import Results from "./Results";

export interface TopicSkill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}
export type TraitsStatus = {
  [key in keyof typeof traitsList]: number;
};

export default function Write() {
  /* for debugging */
  const [debug, setDebug] = useState<boolean>(false);

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

  /* render JSX */
  return (
    <>
      <h1>Comment maker</h1>
      <Options
        genderState={{ gender, handleGenderChange }}
        topicSkillState={{ topics, skills, handleTopicSkillNameChange }}
        traitsState={{ traitsStatus, handleTraitsChange }}
      />

      <hr />

      <Select />

      <hr />
      <Results />

      <hr />

      <div className="text-sm">
        <Button onClick={() => setDebug(!debug)}>Toggle details</Button>
      </div>
      {debug && (
        <div className="grid grid-flow-row">
          <Explanation>Gender: {gender}</Explanation>
          <Explanation>Topics: {JSON.stringify(topics)}</Explanation>
          <Explanation>Skills: {JSON.stringify(skills)}</Explanation>
          <Explanation>Traits: {JSON.stringify(traitsStatus)}</Explanation>
        </div>
      )}
    </>
  );
}
