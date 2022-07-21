import React, { useEffect, useRef, useState } from "react";
import {
  doc,
  collection,
  setDoc,
  where,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { useFirebase } from "../firebase";
import { tonesList, typesList, traitsList, Trait } from "../Comments";
import type { Comment } from "../Comments";
import Button from "../components/Button";
import Explanation from "../components/Explanation";
import LabelButton from "../components/LabelButton";
import Radio from "../components/Radio";

/* placeholder comment */
const emptyComment = {
  id: "",
  text: "create an empty comment",
  tone: "",
  type: "othe",
  trait: "othe-xx-undi",
} as Comment;

/* parsing and checking comment texts
 * it is difficult to parse female pronouns
 * so make sure they are manually parsed before sending the comment
 */
function parseText(commentText: string): string {
  return (
    commentText
      /* gender pronouns */
      .replace(/\b(himself|herself)\b(?!$)/, "<reflexive>")
      .replace(/\b(his)\b(?!$)/, "<possessive>")
      .replace(/\b(him)\b(?!$)/, "<object>")
      .replace(/\b(he|she)\b(?!$)/, "<subject>")
      /* other descriptors */
      .replace(/\b(excellent|great|strong|good|sound)\b(?!$)/, "<strength>")
      .replace(/\b(always|usually|sometimes)\b(?!$)/, "<frequency>")
  );
}
function pronounsExist(commentText: string): boolean {
  return /\b(her)\b(?!$)/.test(commentText);
}
function uppercasesExist(commentText: string): boolean {
  return /([A-Z])[a-z]+/.test(commentText);
}

interface UploadCommentProps {
  traitToEdit: Trait;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditComment({
  traitToEdit,
  setAppStatus,
}: UploadCommentProps) {
  const [commentsFetched, setCommentsFetched] = useState<Array<Comment>>([
    emptyComment,
  ]);
  const [commentChosen, setCommentChosen] = useState<Comment>(emptyComment);
  const [commentEditing, setCommentEditing] = useState<Comment>({
    id: "",
    tone: "",
    type: "othe",
    trait: "othe-xx-undi",
    text: "",
  });

  const db = useFirebase().db;

  /* download the comments matching the trait */
  async function fetchComments() {
    if (traitToEdit === "othe-xx-undi") {
      setAppStatus("awaiting trait selection...");
      return [];
    }
    // get all comments with the same trait
    const q = query(
      collection(db, "comments"),
      where("trait", "==", traitToEdit)
    );
    const querySnapshot = await getDocs(q);
    const commentsFromServer = querySnapshot.docs
      .map((doc) => doc.data() as Comment)
      .sort((ca, cb) => (ca.tone > cb.tone ? 1 : -1));

    // append "create new comment" comment
    setCommentsFetched([
      {
        ...emptyComment,
        trait: traitToEdit,
        type: traitToEdit.slice(0, 4) as keyof typeof typesList,
      },
      ...commentsFromServer,
    ]);
  }
  useEffect(() => {
    fetchComments()
      .then(() => {
        setAppStatus("comments loaded from the selected trait!");
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
    setCommentChosen(commentsFetched[idx]);
  }
  useEffect(() => {
    const commentToEdit =
      commentChosen.tone === ""
        ? { ...commentChosen, text: "" }
        : commentChosen;
    setCommentEditing(commentToEdit);
  }, [commentChosen]);

  // updates the comment from the form input
  // "name" attribute should match the key of Comment
  function handleCommentChange({
    target,
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) {
    const value = target.value;
    const name = target.name;

    if (!["text", "tone", "type", "trait"].includes(name)) {
      setAppStatus("invalid key for comments!");
      return;
    }

    setCommentEditing(
      Object.assign({
        ...commentEditing,
        [name]: value,
      } as React.ComponentState)
    );
    setAppStatus("comments edited!");
  }
  // automatically parse texts
  useEffect(() => {
    const newText = parseText(commentEditing.text);
    if (newText !== commentEditing.text) {
      setAppStatus("parsing complete!");
    }
    setCommentEditing({
      ...commentEditing,
      text: newText,
    });
  }, [commentEditing.text]);

  /* uploads comment to server */
  async function uploadComment() {
    let appStatus = "uploading the comment... ";
    setAppStatus(appStatus);
    try {
      // check comment text
      if (pronounsExist(commentEditing.text)) {
        appStatus += "pronouns exist, please replace!";
        setAppStatus(appStatus);
        return;
      }
      if (uppercasesExist(commentEditing.text)) {
        appStatus += "uppercase letters exist, please check... ";
      }
      // check the comment details
      if (commentEditing.tone === "") {
        appStatus += "tone is not defined!";
        setAppStatus(appStatus);
        return;
      }
      if (commentEditing.trait === "othe-xx-undi") {
        appStatus += "trait is not defined!";
        setAppStatus(appStatus);
        return;
      }

      // upload comment
      const newDocRef =
        // if the id is empty, it is a new document
        commentEditing.id === ""
          ? doc(collection(db, "comments"))
          : doc(db, "comments", commentEditing.id);
      await setDoc(newDocRef, {
        ...commentEditing,
        id: newDocRef.id,
      });
      appStatus += `comment uploaded with id: "${newDocRef.id}"!`;
      setAppStatus(appStatus);

      // reload the comments
      await fetchComments();
    } catch (error) {
      setAppStatus(`upload failed: ${error}`);
    }
  }

  /* delete comment */
  async function deleteComment() {
    let appStatus = "deleting the comment... ";
    setAppStatus(appStatus);

    if (commentEditing.id === "") {
      appStatus += "you cannot delete an empty comment!";
      setAppStatus(appStatus);
      return;
    }

    try {
      // delete the comment
      await deleteDoc(doc(db, "comments", commentEditing.id));
      appStatus += "deletion success!";
      setAppStatus(appStatus);

      // reload the comments
      await fetchComments();
    } catch (error) {
      setAppStatus(`deletion failed: ${error}`);
    }

    return;
  }

  /* Start JSX */
  return (
    <>
      <div
        className="grid grid-cols-[5em,1fr] gap-x-4 gap-y-4
          justify-items-stretch items-begin"
      >
        <span>Comments</span>
        <div>
          <select
            className="select-multiple block w-full p-2 mt-1 bg-none truncate"
            size={7}
            ref={commentSelectionRef}
            onChange={handleCommentSelectionChange}
          >
            {commentsFetched &&
              commentsFetched.map((comment, idx) => (
                <option key={comment.id} value={idx}>
                  {comment.tone} {comment.text}
                </option>
              ))}
          </select>
        </div>

        <span>Editor</span>
        <div className="flex flex-col gap-2">
          <div>
            <Explanation>Trait</Explanation>
            <div>
              <select
                className="select w-full"
                name="trait"
                value={commentEditing.trait}
                onChange={handleCommentChange}
              >
                {Object.entries(traitsList).map(([key, desc]) => (
                  <option key={key} value={key} className={"truncate"}>
                    [{key}] {desc[1]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Explanation>Tone</Explanation>
            <div className="flex gap-2">
              {["+", "-"].map((tone) => (
                <LabelButton
                  key={tone}
                  input={
                    <Radio
                      id={`tone-${tone}`}
                      name="tone"
                      value={tone}
                      checked={commentEditing.tone === tone}
                      onChange={handleCommentChange}
                    />
                  }
                >
                  {tonesList[tone as "+" | "-"]}
                </LabelButton>
              ))}
            </div>
          </div>
          <div>
            <label>
              <Explanation>Text</Explanation>
              <textarea
                name="text"
                id="comment-text"
                placeholder="type a new comment here..."
                rows={2.25}
                className="w-full text-lg break-words textarea"
                value={commentEditing.text}
                onChange={handleCommentChange}
              />
            </label>
            <Explanation>
              {"Placeholders: <topic> <skill(-ing)> <assessment> " +
                "<subject> <object> <possessive> <reflexive>"}
            </Explanation>
          </div>
        </div>

        <span>Diff</span>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              title: "Before",
              comment: commentChosen,
              render: !!commentChosen.tone,
            },
            { title: "After", comment: commentEditing, render: true },
          ].map(
            ({ title, comment, render }) =>
              render && (
                <div key={title}>
                  <span className="font-semibold">{title}</span>
                  <Explanation>
                    [ID] {comment.id ? comment.id : "new comment"}
                  </Explanation>
                  <Explanation>[Type] {typesList[comment.type]}</Explanation>
                  <Explanation className="truncate">
                    [Trait]{" "}
                    {`${comment.trait}: ${traitsList[comment.trait][1]}`}
                  </Explanation>
                  <Explanation>
                    [Tone]{" "}
                    {comment.tone in tonesList
                      ? tonesList[comment.tone as "+" | "-"]
                      : "undefined"}
                  </Explanation>
                  <Explanation>{comment.text}</Explanation>
                </div>
              )
          )}
        </div>
        <span></span>
        <div className="flex gap-2">
          <Button
            variant="solid"
            color="primary"
            className="mb-4"
            onClick={() => uploadComment()}
          >
            Upload comment
          </Button>
          <Button
            variant="solid"
            color="red"
            className="mb-4"
            onClick={() => deleteComment()}
          >
            Delete comment
          </Button>
        </div>
      </div>
    </>
  );
}
