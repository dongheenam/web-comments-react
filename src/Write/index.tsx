/*
 * IDEAS:
 *   - putting a button next to each generated comment to change its "strength"
 *   - calculating effort grade using the traits and strength
 */

import { useState } from "react";
import Explanation from "../components/Explanation";
import type { Comment } from "../Comments";
import ChooseTraits from "./ChooseTraits";
import AdjustComments from "./AdjustComments";
import ShowResults from "./ShowResults";
import useGender from "./useGender";
import useTopicSkills from "./useTopicSkills";
import useFetchComments from "./useFetchComments";
import useTraits from "./useTraits";
import useDecoComments from "./useDecoComments";
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
  const decoCommentsState = useDecoComments({
    gender: genderState.gender,
    topics: topicSkillState.topics,
    skills: topicSkillState.skills,
    fetchedComments: commentsState.fetchedComments,
  });

  /* render JSX */
  return (
    <>
      <h2>Comment maker</h2>
      <ChooseTraits
        genderState={genderState}
        topicSkillState={topicSkillState}
        traitsState={traitsState}
        commentsState={commentsState}
      />
      <hr />

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
      <Explanation className="mt-2">Status: {appStatus}</Explanation>
      <details className="mt-4">
        <summary className="text-base text-gray-500">Show geeky stuff</summary>
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
            Comments: {JSON.stringify(commentsState.fetchedComments)}
          </Explanation>
        </div>
      </details>
    </>
  );
}
