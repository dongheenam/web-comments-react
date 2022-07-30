import { useState } from "react";
import { Trait, Comment } from "../Comments";
import { Explanation } from "../components";
import { useFirebase } from "../firebase";
import EditComment from "./EditComment";
import SelectComment from "./SelectComment";
import SelectTrait from "./SelectTrait";
import SendComment from "./SendComment";

/* placeholder comment */
export const emptyComment = {
  id: "",
  text: "(create an empty comment)",
  tone: "",
  type: "othe",
  trait: "othe-xx-undi",
} as Comment;

export default function EditDatabase() {
  const [traitToEdit, setTraitToEdit] = useState<Trait>("othe-xx-undi");
  const [commentToEdit, setCommentToEdit] = useState<Comment>(emptyComment);
  const [appStatus, setAppStatus] = useState<string>("awating input... ");

  const db = useFirebase().db;

  return (
    <>
      <h2>Edit database</h2>
      <p>
        Modifying or deleting existing comments: select a trait then a comment,
        and edit the comment.
        <br />
        Creating a new comment: select a trait and go straight to the editor
        section.
      </p>
      <SelectTrait {...{ db, traitToEdit, setTraitToEdit, setAppStatus }} />
      <SelectComment {...{ db, traitToEdit, setCommentToEdit, setAppStatus }} />
      <EditComment
        {...{ commentToEdit, setCommentToEdit, appStatus, setAppStatus }}
      />
      <SendComment {...{ db, commentToEdit, appStatus, setAppStatus }} />

      <Explanation>Status: {appStatus}</Explanation>
    </>
  );
}
