import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  Firestore,
} from "firebase/firestore";
import { Comment, tonesList, traitsList, typesList } from "../Comments";
import { Explanation, Button } from "../components";

interface SendCommentProps {
  db: Firestore;
  commentToEdit: Comment;
  appStatus: string;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

function pronounsExist(commentText: string): boolean {
  return /\b(her)\b(?!$)/.test(commentText);
}
function uppercasesExist(commentText: string): boolean {
  return /([A-Z])[a-z]+/.test(commentText);
}

export default function SendComment({
  db,
  commentToEdit,
  appStatus,
  setAppStatus,
}: SendCommentProps) {
  // check comment before uploading
  function checkComment() {
    if (pronounsExist(commentToEdit.text)) {
      return { ok: false, message: "pronouns exist, please replace!" };
    }
    if (uppercasesExist(commentToEdit.text)) {
      return { ok: true, message: "uppercase letters exist... " };
    }
    if (commentToEdit.tone === "") {
      return { ok: false, message: "tone is not defined!" };
    }
    if (commentToEdit.trait === "othe-xx-undi") {
      return { ok: false, message: "trait is not defined!" };
    }
    return { ok: true, message: "" };
  }
  // upload comment
  async function uploadComment() {
    try {
      const docRef =
        commentToEdit.id === ""
          ? doc(collection(db, "comments"))
          : doc(db, "comments", commentToEdit.id);

      await setDoc(docRef, {
        ...commentToEdit,
        id: docRef.id,
      });
      setAppStatus(appStatus + `comment uploaded with id: "${docRef.id}"!`);
    } catch (error) {
      setAppStatus(appStatus + `upload failed: ${error}`);
    }
  }
  // delete comment
  async function deleteComment() {
    try {
      await deleteDoc(doc(db, "comments", commentToEdit.id));
      setAppStatus(appStatus + "deletion success! ");
    } catch (error) {
      setAppStatus(appStatus + `deletion failed: ${error}`);
    }
  }

  return (
    <>
      <h3>Send</h3>
      <div className="mb-4">
        <span>Preview</span>
        <Explanation>
          [ID] {commentToEdit.id ? commentToEdit.id : "new comment"}
        </Explanation>
        <Explanation>[Type] {typesList[commentToEdit.type]}</Explanation>
        <Explanation className="truncate">
          [Trait]{" "}
          {`${commentToEdit.trait}: ${traitsList[commentToEdit.trait][1]}`}
        </Explanation>
        <Explanation>
          [Tone]{" "}
          {commentToEdit.tone in tonesList
            ? tonesList[commentToEdit.tone as "+" | "-"]
            : "undefined"}
        </Explanation>
        <Explanation>{commentToEdit.text}</Explanation>
      </div>
      <div className="flex gap-2">
        <Button
          variant="solid"
          color="primary"
          className="mb-4"
          onClick={() => {
            const { ok, message } = checkComment();
            if (!ok) {
              setAppStatus(message);
              return;
            }
            setAppStatus("uploading comment... " + message);
            uploadComment();
          }}
        >
          Upload comment
        </Button>
        <Button
          variant="solid"
          color="red"
          className="mb-4"
          onClick={() => {
            if (commentToEdit.id === "") {
              setAppStatus("you cannot delete an empty comment! ");
              return;
            }
            setAppStatus("deleting comment... ");
            deleteComment();
          }}
        >
          Delete comment
        </Button>
      </div>
    </>
  );
}
