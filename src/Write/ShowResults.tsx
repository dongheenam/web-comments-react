import { useEffect, useState } from "react";
import Button from "../components/Button";

import { UseDecoComments } from "./useDecoComments";

interface ResultsProps {
  decoCommentsState: UseDecoComments;
}

export default function ShowResults({ decoCommentsState }: ResultsProps) {
  const { decoratedComments } = decoCommentsState;
  const [commentsShown, setCommentsShown] = useState<string>("");

  useEffect(() => {
    setCommentsShown(decoratedComments.join("\n"));
  }, [decoratedComments]);

  return (
    <>
      <h3>Generated comments</h3>
      <textarea
        className="w-full text-lg overflow-x-hidden"
        placeholder="comments will be populated here..."
        rows={decoratedComments.length * 1.125 || 2.25}
        value={commentsShown}
        onChange={(e) => setCommentsShown(e.target.value)}
      />
      <div className="flex gap-2">
        <Button variant="solid" color="primary">
          Copy
        </Button>
      </div>
    </>
  );
}
