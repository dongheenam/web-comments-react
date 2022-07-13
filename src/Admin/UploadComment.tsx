import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { findBestMatch } from "string-similarity";

import { useFirebase } from "../firebase";
import { tonesList, typesList, traitsList } from "../Comments";
import type { Comment } from "../Comments";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Explanation from "../components/Explanation";
import Label from "../components/Label";
import LabelButton from "../components/LabelButton";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import Switch from "../components/Switch";

/* parsing and checking comment texts
 * it is difficult to parse female pronouns
 * so make sure they are manually parsed before sending the comment
 */
function parseText(commentText: string): string {
  return (
    commentText
      /* gender pronouns */
      .replace(/\b(himself|herself|themself)\b(?!$)/, "<reflexive>")
      .replace(/\b(his|their)\b(?!$)/, "<possessive>")
      .replace(/\b(him|them)\b(?!$)/, "<object>")
      .replace(/\b(he|she|they)\b(?!$)/, "<subject>")
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

export default function UploadComment() {
  const [short, setShort] = useState(false);
  const [status, setStatus] = useState<string>("listening to input...");
  const [comment, setComment] = useState<Comment>({
    id: "",
    text: "",
    tone: "+",
    type: "acad",
  });

  const db = useFirebase().db;

  /* FOR LOCAL STATE CHANGES */
  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const value = target.value;
    const name = target.name as keyof Comment;

    setComment(
      Object.assign({ ...comment, [name]: value } as React.ComponentState)
    );
  }
  // resets trait when the type changes
  useEffect(() => {
    setComment({ ...comment, trait: undefined });
  }, [comment.type]);
  // automatically parse texts
  useEffect(() => {
    const newText = parseText(comment.text);
    if (newText !== comment.text) {
      setStatus("parsing complete!");
    }
    setComment({
      ...comment,
      text: newText,
    });
  }, [comment.text]);

  /* FOR UPLOADING TO SERVER */
  async function uploadComment() {
    try {
      // check comment text
      if (pronounsExist(comment.text)) {
        throw new Error("pronouns exist, please replace!");
      }
      if (uppercasesExist(comment.text)) {
        throw new Error("uppercase letters exist, please replace!");
      }

      // upload comment
      const newDocRef = doc(collection(db, "comments"));
      await setDoc(newDocRef, {
        ...comment,
        id: newDocRef.id,
      });
      setStatus(`comment uploaded with id: ${newDocRef.id}`);
    } catch (error) {
      setStatus(`upload failed: ${error}`);
    }
  }

  /* CHECKING IF THE COMMENT ALREADY EXISTS */
  async function compareCommentWithServer() {
    try {
      // get all comments with the same trait
      const queryDB = comment.trait
        ? where("trait", "==", comment.trait)
        : where("trait", "!=", null);
      const q = query(collection(db, "comments"), queryDB);
      const querySnapshot = await getDocs(q);
      const commentsFromServer = querySnapshot.docs.map(
        (doc) => doc.data() as Comment
      );
      const commentTextsFromServer = commentsFromServer.map(
        (comment) => comment.text
      );

      if (commentTextsFromServer.length === 0) {
        setStatus("comments matching the trait does not exist on the server.");
        return;
      }
      // compare the comments text
      const matchResult = findBestMatch(comment.text, commentTextsFromServer);
      const rating = matchResult.bestMatch.rating;
      const matchedComment = commentsFromServer[matchResult.bestMatchIndex];
      setStatus(
        `checked ${commentTextsFromServer.length} comment(s), ` +
          `best match is [${Math.floor(rating * 100)}%]: ` +
          `${JSON.stringify(matchedComment)}`
      );
    } catch (error) {
      setStatus(`check failed: ${error}`);
    }
  }

  return (
    <>
      <h2>Upload comments</h2>
      <Explanation>
        Selectors list:{" "}
        {"<topic> <skill-ing> <assessment> <strength> <frequency> "}
        {"<subject> <object> <possessive> <reflexive>"}
      </Explanation>
      <TextInput
        label="Raw comment"
        name="text"
        id="text"
        className="font-mono text-lg"
        onChange={handleChange}
        value={comment?.text}
      />
      <hr />
      <div
        className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-4
          justify-items-stretch items-center"
      >
        <span></span>
        <div>
          <Label
            input={
              <Switch
                id="shorten"
                checked={short}
                onChange={() => setShort(!short)}
              />
            }
          >
            Use ID instead of description
          </Label>
        </div>
        <span>Tone</span>
        <div className="flex gap-2 text-base flex-wrap">
          {Object.entries(tonesList).map(([key, label]) => (
            <LabelButton
              key={`tone-${key}`}
              input={
                <Radio
                  id={`tone-${key}`}
                  name="tone"
                  value={key}
                  checked={comment.tone === key}
                  onChange={handleChange}
                />
              }
            >
              {label}
            </LabelButton>
          ))}
        </div>
        <span>Type</span>
        <div className="flex gap-2 text-base flex-wrap">
          {Object.entries(typesList).map(([key, label]) => (
            <LabelButton
              key={`type-${key}`}
              input={
                <Radio
                  id={`type-${key}`}
                  name="type"
                  value={key}
                  checked={comment.type === key}
                  onChange={handleChange}
                />
              }
            >
              {label}
            </LabelButton>
          ))}
        </div>
        <span className="self-start">Trait</span>
        <div className="flex flex-col">
          <Explanation>Punctuality and Organisation</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "po")
              .map(([key, label]) => (
                <LabelButton
                  key={`trait-${key}`}
                  input={
                    <Checkbox
                      id={`trait-${key}`}
                      name="trait"
                      disabled={key.slice(0, 4) !== comment.type}
                      value={key}
                      checked={comment.trait === key}
                      onChange={handleChange}
                    />
                  }
                >
                  {short ? key : label}
                </LabelButton>
              ))}
          </div>
          <Explanation>Effective Use of Class Time and Technology</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "eu")
              .map(([key, label]) => (
                <LabelButton
                  key={`trait-${key}`}
                  input={
                    <Checkbox
                      id={`trait-${key}`}
                      name="trait"
                      disabled={key.slice(0, 4) !== comment.type}
                      value={key}
                      checked={comment.trait === key}
                      onChange={handleChange}
                    />
                  }
                >
                  {short ? key : label}
                </LabelButton>
              ))}
          </div>
          <Explanation>Independent Approach to Learning</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "ia")
              .map(([key, label]) => (
                <LabelButton
                  key={`trait-${key}`}
                  input={
                    <Checkbox
                      id={`trait-${key}`}
                      name="trait"
                      disabled={key.slice(0, 4) !== comment.type}
                      value={key}
                      checked={comment.trait === key}
                      onChange={handleChange}
                    />
                  }
                >
                  {short ? key : label}
                </LabelButton>
              ))}
          </div>
          <Explanation>Meeting Deadlines</Explanation>
          <div className="mb-4 flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "md")
              .map(([key, label]) => (
                <LabelButton
                  key={`trait-${key}`}
                  input={
                    <Checkbox
                      id={`trait-${key}`}
                      name="trait"
                      disabled={key.slice(0, 4) !== comment.type}
                      value={key}
                      checked={comment.trait === key}
                      onChange={handleChange}
                    />
                  }
                >
                  {short ? key : label}
                </LabelButton>
              ))}
          </div>
          <Explanation>Others</Explanation>
          <div className="flex gap-2 text-base flex-wrap">
            {Object.entries(traitsList)
              .filter(([key, _label]) => key.slice(5, 7) === "xx")
              .map(([key, label]) => (
                <LabelButton
                  key={`trait-${key}`}
                  input={
                    <Checkbox
                      id={`trait-${key}`}
                      name="trait"
                      disabled={key.slice(0, 4) !== comment.type}
                      value={key}
                      checked={comment.trait === key}
                      onChange={handleChange}
                    />
                  }
                >
                  {short ? key : label}
                </LabelButton>
              ))}
          </div>
        </div>
      </div>

      <hr />

      <div className="flex gap-4">
        <Button
          variant="outline"
          color="primary"
          className="mb-4"
          onClick={() => compareCommentWithServer()}
        >
          Check duplicate
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="mb-4"
          onClick={() => uploadComment()}
        >
          Submit comment
        </Button>
      </div>
      <div className="flex flex-col h-16">
        <Explanation>Parsed comment: {JSON.stringify(comment)}</Explanation>
        <Explanation>Status: {status}</Explanation>
      </div>
    </>
  );
}