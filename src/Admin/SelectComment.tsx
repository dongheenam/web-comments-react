import {
  query,
  collection,
  where,
  getDocs,
  Firestore,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Trait, Comment, typesList } from "../Comments";
import { emptyComment } from "./EditDatabase";

interface SelectCommentProps {
  db: Firestore;
  traitToEdit: Trait;
  setCommentToEdit: React.Dispatch<React.SetStateAction<Comment>>;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectComment({
  db,
  traitToEdit,
  setCommentToEdit,
  setAppStatus,
}: SelectCommentProps) {
  /* download the comments matching the trait */
  const [commentsFetched, setCommentsFetched] = useState<Array<Comment>>([]);
  async function fetchComments() {
    if (traitToEdit === "othe-xx-undi") {
      setAppStatus("awaiting trait selection... ");
      return [];
    }
    const q = query(
      collection(db, "comments"),
      where("trait", "==", traitToEdit)
    );
    const unload = onSnapshot(q, (querySnapshot) => {
      const commentsFromServer = querySnapshot.docs
        .map((doc) => doc.data() as Comment)
        .sort((ca, cb) => (ca.tone > cb.tone ? 1 : -1));

      const emptyCommentWithTrait = {
        ...emptyComment,
        trait: traitToEdit,
        type: traitToEdit.slice(0, 4) as keyof typeof typesList,
      };
      setCommentsFetched(commentsFromServer);
      setCommentToEdit(emptyCommentWithTrait);
    });
    // const querySnapshot = await getDocs(q);
  }
  // fetch comments when user selects a trait
  useEffect(() => {
    fetchComments()
      .then(() => {
        setAppStatus("comments loaded from the selected trait! ");
      })
      .catch((error) => {
        setAppStatus(`error occurred while fetching the traits: ${error}`);
      });
  }, [traitToEdit]);

  /* handles selection of comments to edit*/
  const commentSelectionRef = useRef(null);
  function handleCommentSelectionChange({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) {
    const idx = parseInt(target.value);
    setCommentToEdit(commentsFetched[idx]);
  }

  return (
    <>
      <h3>Comments</h3>
      <select
        className="select-multiple block w-full p-2 mt-1 bg-none"
        size={7}
        ref={commentSelectionRef}
        onChange={handleCommentSelectionChange}
      >
        {commentsFetched &&
          commentsFetched.map((comment, idx) => (
            <option key={comment.id} value={idx} className="truncate">
              {comment.tone} {comment.text}
            </option>
          ))}
      </select>
    </>
  );
}
