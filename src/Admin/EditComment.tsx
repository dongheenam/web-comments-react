import React, { useEffect } from "react";

import { tonesList, traitsList } from "../Comments";
import type { Comment } from "../Comments";
import { Explanation, LabelButton, Radio } from "../components";

function parseText(commentText: string): string {
  return (
    commentText
      // gender pronouns
      .replace(/\b(himself|herself)\b(?!$)/, "<reflexive>")
      .replace(/\b(his)\b(?!$)/, "<possessive>")
      .replace(/\b(him)\b(?!$)/, "<object>")
      .replace(/\b(he|she)\b(?!$)/, "<subject>")
  );
}

interface UploadCommentProps {
  commentToEdit: Comment;
  setCommentToEdit: React.Dispatch<React.SetStateAction<Comment>>;
  appStatus: string;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditComment({
  commentToEdit,
  setCommentToEdit,
  setAppStatus,
}: UploadCommentProps) {
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

    setCommentToEdit(
      Object.assign({
        ...commentToEdit,
        [name]: value,
      } as React.ComponentState)
    );
    setAppStatus("comments edited! ");
  }
  // automatically parse texts
  useEffect(() => {
    const newText = parseText(commentToEdit.text);
    if (newText !== commentToEdit.text) {
      setAppStatus("parsing complete!");
    }
    setCommentToEdit({
      ...commentToEdit,
      text: newText,
    });
  }, [commentToEdit.text]);
  // remove placeholder text for empty comment
  useEffect(() => {
    if (commentToEdit.id !== "") return;
    setCommentToEdit({
      ...commentToEdit,
      text: "",
    });
  }, [commentToEdit.id, commentToEdit.trait]);

  /* Start JSX */
  return (
    <>
      <h3>Editor</h3>
      <div
        className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-4
    justify-items-stretch items-start"
      >
        <span className="self-center">Trait</span>
        <select
          className="select w-full"
          name="trait"
          value={commentToEdit.trait}
          onChange={handleCommentChange}
        >
          {Object.entries(traitsList).map(([key, desc]) => (
            <option key={key} value={key} className={"truncate"}>
              [{key}] {desc[1]}
            </option>
          ))}
        </select>

        <span className="self-center">Tone</span>
        <div className="flex gap-2">
          {["+", "-"].map((tone) => (
            <LabelButton
              key={tone}
              input={
                <Radio
                  id={`tone-${tone}`}
                  name="tone"
                  value={tone}
                  checked={commentToEdit.tone === tone}
                  onChange={handleCommentChange}
                />
              }
            >
              {tonesList[tone as "+" | "-"]}
            </LabelButton>
          ))}
        </div>

        <span>Text</span>
        <div>
          <textarea
            name="text"
            id="comment-text"
            placeholder="type a new comment here..."
            rows={2.25}
            className="w-full text-lg break-words textarea"
            value={commentToEdit.text}
            onChange={handleCommentChange}
          />
          <Explanation>
            {"Placeholders: <topic> <skill(-ing)> <assessment> " +
              "<subject> <object> <possessive> <reflexive> [synonym|synonym]"}
          </Explanation>
        </div>
      </div>
    </>
  );
}
