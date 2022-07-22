import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

import type { CommentsCount } from "../Comments";
import { Button, Explanation } from "../components";
import { useFirebase } from "../firebase";

export default function CheckCount() {
  const [status, setStatus] = useState<string>("awaiting input...");
  const [commentCounts, setCommentCounts] = useState<CommentsCount>();

  const functions = getFunctions(useFirebase().app, "australia-southeast1");

  async function triggerCount() {
    setStatus("request sent! awaiting response...");
    try {
      const setCountComments = httpsCallable(functions, "setCountComments");
      const countsData = (await setCountComments()) as { data: CommentsCount };
      setCommentCounts(countsData.data);
      setStatus("count updated!");
    } catch (error) {
      setStatus(`count failed: ${error}`);
    }
  }

  return (
    <>
      <h2>Update comment counts</h2>
      <p>
        Clicking the button will update the count of comments on the server.
        Useful for looking for outdated traits.
      </p>
      <Button
        variant="outline"
        color="primary"
        className="mb-4"
        onClick={() => triggerCount()}
      >
        Update comment numbers
      </Button>
      <Explanation>Status: {status}</Explanation>
      <Explanation>Counts: {JSON.stringify(commentCounts)}</Explanation>
    </>
  );
}
