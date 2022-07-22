import { Comment } from "../Comments";
import { SortedComments } from "./useDecoComments";

interface AdjustCommentsProp {
  sortedComments: SortedComments;
  setChosenComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}
export default function AdjustComments({
  sortedComments,
  setChosenComments,
}: AdjustCommentsProp) {
  return (
    <>
      <div>
        <div>Commending</div>

        <div>Suggesting</div>
      </div>
    </>
  );
}
