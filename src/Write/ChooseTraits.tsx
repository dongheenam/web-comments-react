import { togglableTraitsList } from "../Comments";
import Button from "../components/Button";
import Explanation from "../components/Explanation";
import LabelButton from "../components/LabelButton";
import Radio from "../components/Radio";
import TextInput from "../components/TextInput";
import TraitButton from "../components/TraitButton";
import TraitCheckbox from "../components/TraitCheckbox";

import type { UseFetchComments } from "./useFetchComments";
import type { UseGender } from "./useGender";
import type { UseTopicSkills } from "./useTopicSkills";
import type { UseTraits, TraitsStatus } from "./useTraits";

interface OptionsProps {
  genderState: UseGender;
  topicSkillState: UseTopicSkills;
  traitsState: UseTraits;
  commentsState: UseFetchComments;
}

export default function ChooseTraits({
  genderState,
  topicSkillState,
  traitsState,
  commentsState,
}: OptionsProps) {
  const { gender, handleGenderChange } = genderState;
  const {
    topics,
    skills,
    handleTopicSkillNameChange,
    handleTopicSkillStatusChange,
  } = topicSkillState;
  const { traitsStatus, handleTraitsChange } = traitsState;
  const { fetchComments } = commentsState;

  return (
    <>
      <h3>Choose Traits</h3>
      <div
        className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-4
    justify-items-stretch items-start"
      >
        <span className="self-center">Gender</span>
        <div className="flex gap-2 text-base flex-wrap">
          {["male", "female", "other"].map((item) => (
            <LabelButton
              key={`gender-${item}`}
              input={
                <Radio
                  id={`gender-${item}`}
                  name="gender"
                  value={item}
                  checked={gender === item}
                  onChange={handleGenderChange}
                />
              }
            >
              {item}
            </LabelButton>
          ))}
        </div>

        <span>Topics</span>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((idx) => (
            <div
              key={`topic-${idx}`}
              className="grid grid-cols-[1fr,auto] gap-2 items-end"
            >
              <TextInput
                id={`topic-${idx}`}
                label={`Topic ${idx + 1}`}
                name="topic"
                className="text-lg"
                value={topics[idx].name}
                onChange={handleTopicSkillNameChange}
                placeholder={
                  idx === 0
                    ? "starts with a capital (Algebra, Numbers, ...)"
                    : ""
                }
              />
              <TraitButton
                containerProps={{ className: "align-middle" }}
                className="h-[2.5em] w-[3.5em] rounded-md p-0 flex justify-center items-center"
                input={
                  <TraitCheckbox
                    id={`topic-status-${idx}`}
                    name="topic-status"
                    status={topics[idx].status}
                    onChange={handleTopicSkillStatusChange}
                  />
                }
              >
                {["bad", "level", "good"][topics[idx].status]}
              </TraitButton>
            </div>
          ))}
        </div>

        <span>Skills</span>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((idx) => (
            <div
              key={`skill-${idx}`}
              className="grid grid-cols-[1fr,auto] gap-2 items-end"
            >
              <TextInput
                id={`skill-${idx}`}
                label={`Skill ${idx + 1}`}
                name="skill"
                className="text-lg"
                value={skills[idx].name}
                onChange={handleTopicSkillNameChange}
                placeholder={
                  idx === 0 ? "starts with a verb (adding fractions, ...)" : ""
                }
              />
              <TraitButton
                containerProps={{ className: "align-middle" }}
                className="h-[2.5em] w-[3.5em] rounded-md p-0 flex justify-center items-center"
                input={
                  <TraitCheckbox
                    id={`skill-status-${idx}`}
                    name="skill-status"
                    status={skills[idx].status}
                    onChange={handleTopicSkillStatusChange}
                  />
                }
              >
                {["bad", "level", "good"][skills[idx].status]}
              </TraitButton>
            </div>
          ))}
        </div>

        <span>Traits</span>
        <div className="flex flex-col">
          <Explanation>Punctuality and Organisation</Explanation>
          <div className="mb-4 grid grid-cols-3 gap-2 justify-items-stretch text-base">
            {Object.entries(togglableTraitsList)
              .filter(([key, _labels]) => key.slice(5, 7) === "po")
              .map(([key, labels]) => (
                <TraitButton
                  key={key}
                  className="w-full text-center truncate"
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {labels[traitsStatus[key as keyof TraitsStatus]]}
                </TraitButton>
              ))}
          </div>
          <Explanation>Effective Use of Class Time and Technology</Explanation>
          <div className="mb-4 grid grid-cols-3 gap-2 justify-items-stretch text-base">
            {Object.entries(togglableTraitsList)
              .filter(([key, _labels]) => key.slice(5, 7) === "eu")
              .map(([key, labels]) => (
                <TraitButton
                  key={key}
                  containerProps={{ className: "hover:min-w-min hover:z-10" }}
                  className="w-full text-center truncate"
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {labels[traitsStatus[key as keyof TraitsStatus]]}
                </TraitButton>
              ))}
          </div>
          <Explanation>Independent Approach to Learning</Explanation>
          <div className="mb-4 grid grid-cols-3 gap-2 justify-items-stretch text-base">
            {Object.entries(togglableTraitsList)
              .filter(([key, _labels]) => key.slice(5, 7) === "ia")
              .map(([key, labels]) => (
                <TraitButton
                  key={key}
                  containerProps={{ className: "hover:min-w-min hover:z-10" }}
                  className="w-full text-center truncate"
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {labels[traitsStatus[key as keyof TraitsStatus]]}
                </TraitButton>
              ))}
          </div>
          <Explanation>Meeting Deadlines</Explanation>
          <div className="mb-4 grid grid-cols-3 gap-2 justify-items-stretch text-base">
            {Object.entries(togglableTraitsList)
              .filter(([key, _labels]) => key.slice(5, 7) === "md")
              .map(([key, labels]) => (
                <TraitButton
                  key={key}
                  containerProps={{ className: "hover:min-w-min hover:z-10" }}
                  className="w-full text-center truncate"
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {labels[traitsStatus[key as keyof TraitsStatus]]}
                </TraitButton>
              ))}
          </div>
          <Explanation>Others</Explanation>
          <div className="grid grid-cols-3 gap-2 justify-items-stretch text-base">
            {Object.entries(togglableTraitsList)
              .filter(([key, _labels]) => key.slice(5, 7) === "xx")
              .map(([key, labels]) => (
                <TraitButton
                  key={key}
                  containerProps={{ className: "hover:min-w-min hover:z-10" }}
                  className="w-full text-center truncate"
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {labels[traitsStatus[key as keyof TraitsStatus]]}
                </TraitButton>
              ))}
          </div>
        </div>
        <span></span>
        <div>
          <Button
            variant="solid"
            color="primary"
            onClick={() => fetchComments()}
          >
            Load comments
          </Button>
        </div>
      </div>
    </>
  );
}
