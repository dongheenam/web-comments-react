import Button from "../components/Button";
import { makePronouns } from "../Comments";
import type { Comment, Gender } from "../Comments";
import { useEffect, useState } from "react";

interface ResultsProps {
  genderState: {
    gender: Gender;
  };
  commentsState: {
    commentList: Array<Comment>;
    fetchComments: () => Promise<void>;
  };
}

export default function Results({ genderState, commentsState }: ResultsProps) {
  const { gender } = genderState;
  const { commentList } = commentsState;

  /* populate the pronouns */
  function genderComment(commentText: string) {
    const pronouns = makePronouns(gender);
    return commentText
      .replaceAll(/<subject>/g, pronouns.subject)
      .replaceAll(/<object>/g, pronouns.object)
      .replaceAll(/<possessive>/g, pronouns.possessive)
      .replaceAll(/<reflexive>/g, pronouns.reflexive);
  }

  /* show the resultant comments */
  const [commentResult, setCommentResult] = useState<string>("");
  useEffect(() => {
    const decoratedComments = commentList
      .map((comment) => `${comment.tone} ${comment.text}`)
      .map((text) => genderComment(text));

    setCommentResult(decoratedComments.join("\n"));
  }, [gender, commentList]);

  return (
    <>
      <h3>Generated comments</h3>
      <textarea
        className="w-full text-lg"
        placeholder="comments will be populated here..."
        value={commentResult}
        onChange={(e) => setCommentResult(e.target.value)}
      />
      <div className="flex gap-2">
        <Button variant="solid" color="primary">
          Copy
        </Button>
        <Button variant="outline" color="red">
          Clear traits
        </Button>
      </div>
    </>
  );
}
