/*
 * IDEAS:
 *   - putting a button next to each generated comment to change its "strength"
 *   - calculating effort grade using the traits and strength
 */

import { useState } from "react";
import Explanation from "../components/Explanation";
import type { Gender, Comment } from "../Comments";
import ChooseTraits from "./ChooseTraits";
import AdjustComments from "./AdjustComments";
import ShowResults from "./ShowResults";
import useGender from "./useGender";
import useTopicSkills from "./useTopicSkills";
import useFetchComments from "./useFetchComments";
import useTraits from "./useTraits";
import useDecoComments from "./useDecoComments";

export type CommentsState = {
  commentList: Array<Comment>;
  fetchComments: () => Promise<void>;
};

export default function Write() {
  /* for debugging */
  const [appStatus, setAppStatus] = useState<string>();

  /* states */
  const genderState = useGender();
  const topicSkillState = useTopicSkills();
  const traitsState = useTraits();
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
      <h1>Comment maker</h1>
      <ChooseTraits
        genderState={genderState}
        topicSkillState={topicSkillState}
        traitsState={traitsState}
        commentsState={commentsState}
      />
      <hr />

      <ShowResults decoCommentsState={decoCommentsState} />

      <details className="mt-8">
        <summary className="text-base text-gray-500">Show geeky stuff</summary>
        <div className="grid grid-flow-row">
          <Explanation>Status: {appStatus}</Explanation>
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
            Comments: {JSON.stringify(commentsState.fetchedComments)}
          </Explanation>
        </div>
      </details>
    </>
  );
}
