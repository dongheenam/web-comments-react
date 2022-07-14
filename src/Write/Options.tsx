import { TopicSkill, TraitsStatus } from ".";
import { Gender, Comment, traitsList } from "../Comments";
import Button from "../components/Button";
import Explanation from "../components/Explanation";
import LabelButton from "../components/LabelButton";
import Radio from "../components/Radio";
import TextInput from "../components/TextInput";
import TraitButton from "../components/TraitButton";
import TraitCheckbox from "../components/TraitCheckbox";

interface OptionsProps {
  genderState: {
    gender: Gender;
    handleGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  topicSkillState: {
    topics: Array<TopicSkill>;
    skills: Array<TopicSkill>;
    handleTopicSkillNameChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;
  };
  traitsState: {
    traitsStatus: TraitsStatus;
    handleTraitsChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  };
  commentsState: {
    commentList: Array<Comment>;
    fetchComments: () => Promise<void>;
  };
}

export default function Options({
  genderState,
  topicSkillState,
  traitsState,
  commentsState,
}: OptionsProps) {
  const { gender, handleGenderChange } = genderState;
  const { topics, skills, handleTopicSkillNameChange } = topicSkillState;
  const { traitsStatus, handleTraitsChange } = traitsState;
  const { fetchComments } = commentsState;

  return (
    <>
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
            <TextInput
              id={`topic-${idx}`}
              key={`topic-${idx}`}
              label={`Topic ${idx + 1}`}
              name="topic"
              className="text-lg"
              value={topics[idx]?.name}
              onChange={handleTopicSkillNameChange}
              placeholder={
                idx === 0 ? "starts with a capital (Algebra, Numbers, ...)" : ""
              }
            />
          ))}
        </div>

        <span>Skills</span>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((idx) => (
            <TextInput
              id={`skill-${idx}`}
              key={`skill-${idx}`}
              label={`Skill ${idx + 1}`}
              name="skill"
              className="text-lg"
              value={skills[idx]?.name}
              onChange={handleTopicSkillNameChange}
              placeholder={
                idx === 0 ? "starts with a verb (adding fractions, ...)" : ""
              }
            />
          ))}
        </div>

        <span>Traits</span>
        <div className="flex flex-col">
          <Explanation>Punctuality and Organisation</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "po")
              .map(([key, label]) => (
                <TraitButton
                  key={key}
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {label}
                </TraitButton>
              ))}
          </div>
          <Explanation>Effective Use of Class Time and Technology</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "eu")
              .map(([key, label]) => (
                <TraitButton
                  key={key}
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {label}
                </TraitButton>
              ))}
          </div>
          <Explanation>Independent Approach to Learning</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "ia")
              .map(([key, label]) => (
                <TraitButton
                  key={key}
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {label}
                </TraitButton>
              ))}
          </div>
          <Explanation>Meeting Deadlines</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "md")
              .map(([key, label]) => (
                <TraitButton
                  key={key}
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {label}
                </TraitButton>
              ))}
          </div>
          <Explanation>Others</Explanation>
          <div className="flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "xx")
              .map(([key, label]) => (
                <TraitButton
                  key={key}
                  input={
                    <TraitCheckbox
                      id={key}
                      name="trait"
                      status={traitsStatus[key as keyof TraitsStatus]}
                      onClick={handleTraitsChange}
                    />
                  }
                >
                  {label}
                </TraitButton>
              ))}
          </div>
        </div>
        <span></span>
        <div>
          <Button
            variant="outline"
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
