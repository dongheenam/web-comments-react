import React, { useState } from "react";

export interface TopicSkill {
  name: string;
  status: number;
}
export interface UseTopicSkills {
  topics: Array<TopicSkill>;
  skills: Array<TopicSkill>;
  handleTopicSkillNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTopicSkillStatusChange: (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => void;
  clearTopicSkills: () => void;
}

export default function useTopicSkills(): UseTopicSkills {
  /* topics and skills input */
  const initialTopicSkills = [
    { name: "", status: 1 },
    { name: "", status: 1 },
  ];
  const [topics, setTopics] = useState<Array<TopicSkill>>(initialTopicSkills);
  const [skills, setSkills] = useState<Array<TopicSkill>>(initialTopicSkills);

  // reset
  function clearTopicSkills() {
    setTopics(initialTopicSkills);
    setSkills(initialTopicSkills);
  }

  // name changes
  function handleTopicSkillNameChange({
    target,
  }: React.ChangeEvent<HTMLInputElement>) {
    let newList, setList;
    if (target.name === "topic") {
      newList = [...topics];
      setList = setTopics;
    } else if (target.name === "skill") {
      newList = [...skills];
      setList = setSkills;
    } else {
      return;
    }
    const idx = parseInt(target.id.slice(-1));
    newList[idx] = {
      ...newList[idx],
      name: target.value,
    };
    setList(newList);
  }

  // tone changes
  function handleTopicSkillStatusChange(
    event: React.SyntheticEvent<HTMLInputElement>
  ) {
    const target = event.target as HTMLInputElement;
    let newList, setList;
    if (target.name === "topic-status") {
      newList = [...topics];
      setList = setTopics;
    } else if (target.name === "skill-status") {
      newList = [...skills];
      setList = setSkills;
    } else {
      return;
    }
    const idx = parseInt(target.id.slice(-1));
    newList[idx] = {
      ...newList[idx],
      status: (newList[idx].status + 1) % 3,
    };
    setList(newList);
  }

  return {
    topics,
    skills,
    handleTopicSkillNameChange,
    handleTopicSkillStatusChange,
    clearTopicSkills,
  };
}
