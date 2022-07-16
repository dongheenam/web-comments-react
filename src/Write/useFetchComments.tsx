import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useFirebase } from "../firebase";

import type { TraitsStatus } from "./useTraits";
import type { Comment } from "../Comments";
import type { TopicSkill } from "./useTopicSkills";
import { choice } from "../util";

interface UseFetchCommentsProps {
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
  topics: Array<TopicSkill>;
  skills: Array<TopicSkill>;
  traitsStatus: TraitsStatus;
}
export interface UseFetchComments {
  fetchedComments: Array<Comment>;
  fetchComments: () => Promise<void>;
}

export default function useFetchComments({
  setAppStatus,
  topics,
  skills,
  traitsStatus,
}: UseFetchCommentsProps): UseFetchComments {
  const [fetchedComments, setFetchedComments] = useState<Array<Comment>>([]);
  const db = useFirebase().db;

  /* fetch the comments from the given statuses of traits */
  async function fetchComments() {
    let appStatus = "fetching the comments... ";
    setAppStatus(appStatus);
    // filtering positive and negative traits
    let positiveTraits = Object.entries(traitsStatus)
      .filter(([_key, val]) => val === 2)
      .map(([key, _val]) => key);
    let negativeTraits = Object.entries(traitsStatus)
      .filter(([_key, val]) => val === 0)
      .map(([key, _val]) => key);

    // if there are too many traits chosen,
    // truncate the number of traits to 8 each
    positiveTraits = choice(positiveTraits, 8);
    negativeTraits = choice(negativeTraits, 8);

    // add topics and skills
    // prepend the trait so that they appear first in the list
    if (topics.some((topic) => topic.status === 2)) {
      positiveTraits.unshift("acad-xx-topi");
    }
    if (topics.some((topic) => topic.status === 0)) {
      negativeTraits.unshift("acad-xx-topi");
    }
    if (skills.some((skill) => skill.status === 2)) {
      positiveTraits.unshift("acad-xx-skil");
    }
    if (skills.some((skill) => skill.status === 0)) {
      negativeTraits.unshift("acad-xx-skil");
    }

    if (positiveTraits.length + negativeTraits.length === 0) {
      alert("Select at least one positive or negative traits!");
      setAppStatus("fetch failed (0 traits selected)");
      return;
    }

    appStatus +=
      `with ${positiveTraits.length} positive trait(s), ` +
      `${negativeTraits.length} negative trait(s)... `;
    setAppStatus(appStatus);

    // queries targeting the traits
    // current Firestore limit is up to 10 traits for each query
    const commentsCollection = collection(db, "comments");
    const promises = [];
    if (positiveTraits.length !== 0) {
      const qPositive = query(
        commentsCollection,
        where("trait", "in", positiveTraits),
        where("tone", "==", "+")
      );
      promises.push(getDocs(qPositive));
    }
    if (negativeTraits.length !== 0) {
      const qNegative = query(
        commentsCollection,
        where("trait", "in", negativeTraits),
        where("tone", "==", "-")
      );
      promises.push(getDocs(qNegative));
    }
    const querySnapshots = await Promise.all(promises);
    const comments = querySnapshots
      .map((qS) => qS.docs.map((doc) => doc.data() as Comment))
      .flat(1);

    setFetchedComments(comments);
    appStatus += `loaded ${comments.length} comment(s)!`;
    setAppStatus(appStatus);
  }

  return { fetchedComments, fetchComments };
}
