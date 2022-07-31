import { useState } from "react";
import { Explanation } from "../components";
import ChooseTraits from "./SelectTraits";
import ShowResults from "./ShowResults";
import useGender from "./useGender";
import useTopicSkills from "./useTopicSkills";
import useFetchComments from "./useFetchComments";
import useTraits from "./useTraits";
import useChooseComments from "./useChooseComments";
import useEffortGrades from "./useEffortGrades";

export default function Write() {
  /* for debugging */
  const [appStatus, setAppStatus] = useState<string>("awaiting submission...");

  /* states */
  const genderState = useGender();
  const topicSkillState = useTopicSkills();
  const traitsState = useTraits();
  const effortGradeState = useEffortGrades({
    traitsStatus: traitsState.traitsStatus,
  });
  const commentsState = useFetchComments({
    setAppStatus: setAppStatus,
    topics: topicSkillState.topics,
    skills: topicSkillState.skills,
    traitsStatus: traitsState.traitsStatus,
  });
  const decoCommentsState = useChooseComments({
    gender: genderState.gender,
    topics: topicSkillState.topics,
    skills: topicSkillState.skills,
    fetchedComments: commentsState.fetchedComments,
  });

  /* render JSX */
  return (
    <>
      <h1>Comments Generator</h1>
      <section>
        <ChooseTraits
          genderState={genderState}
          topicSkillState={topicSkillState}
          traitsState={traitsState}
          commentsState={commentsState}
        />
      </section>
      <section>
        <ShowResults
          decoCommentsState={decoCommentsState}
          effortGradeState={effortGradeState}
          setAppStatus={setAppStatus}
          clearingFunctions={{
            clearGender: genderState.clearGender,
            clearTraits: traitsState.clearTraits,
            clearTopicSkills: topicSkillState.clearTopicSkills,
          }}
        />
      </section>
      <section>
        <Explanation>Status: {appStatus}</Explanation>
        <details>
          <summary className="text-base text-gray-500">
            Show geeky stuff
          </summary>
          <div className="grid grid-flow-row">
            <Explanation>Gender: {genderState.gender}</Explanation>
            <Explanation>
              Topics: {JSON.stringify(topicSkillState.topics)}
            </Explanation>
            <Explanation>
              Skills: {JSON.stringify(topicSkillState.skills)}
            </Explanation>
            <Explanation>
              Traits: {JSON.stringify(traitsState.traitsStatus)}
            </Explanation>
            <Explanation>
              Efforts: {JSON.stringify(effortGradeState.effortGrades)}
            </Explanation>
            <Explanation>
              Comments downloaded: {commentsState.fetchedComments.length}
            </Explanation>
            <Explanation>
              Comments selected:{" "}
              {JSON.stringify(decoCommentsState.decoratedComments)}
            </Explanation>
          </div>
        </details>
      </section>
    </>
  );
}
