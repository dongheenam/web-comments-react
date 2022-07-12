import React, { useEffect, useState } from "react";
// import { doc, collection, setDoc } from "firebase/firestore";

import { useFirebase } from "../firebase";
import { tonesList, typesList, traitsList } from "../Comments";
import { Comment } from "../Comments";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Explanation from "../components/Explanation";
import Label from "../components/Label";
import LabelButton from "../components/LabelButton";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import Switch from "../components/Switch";

export default function Admin() {
  const [short, setShort] = useState(false);
  const [comment, setComment] = useState<Comment>({
    id: "",
    text: "",
    tone: "+",
    type: "acad",
  });
  const db = useFirebase().db;

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const value = target.value;
    const name = target.name as keyof Comment;

    setComment(
      Object.assign({ ...comment, [name]: value } as React.ComponentState)
    );
  }
  useEffect(() => {
    setComment({ ...comment, trait: undefined });
  }, [comment.type]);

  return (
    <>
      <h1>Admin</h1>
      <TextInput
        label="Raw comment"
        name="text"
        id="text"
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
      <Button type="submit" variant="solid" color="primary" className="mb-4">
        Submit comment
      </Button>
      <Explanation>Parsed comment: {JSON.stringify(comment)}</Explanation>
      <Explanation>Status: </Explanation>
    </>
  );
}
