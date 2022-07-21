import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { emptyComment } from "./EditDatabase";
import { typesList, traitsList, Trait, Comment } from "../Comments";
import LabelButton from "../components/LabelButton";
import Radio from "../components/Radio";
import { useFirebase } from "../firebase";

interface SelectCommentProps {
  setCommentToEdit: React.Dispatch<React.SetStateAction<Comment>>;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectComment({
  setCommentToEdit,
  setAppStatus,
}: SelectCommentProps) {
  const [traitsFetched, setTraitsFetched] = useState<Array<Trait>>([]);
  const [type, setType] = useState<string>(Object.keys(typesList)[0]);
  const [trait, setTrait] = useState<Trait>();
  const [commentsFetched, setCommentsFetched] = useState<Array<Comment>>([
    emptyComment,
  ]);

  const db = useFirebase().db;

  /* download the list of existing traits from comments-count */
  async function fetchTraitsFromCounts() {
    const querySnapshot = await getDocs(collection(db, "comments-count"));
    const traitsFromCounts = querySnapshot.docs.map(
      (doc) => doc.data().trait as Trait
    );
    return traitsFromCounts;
  }
  useEffect(() => {
    fetchTraitsFromCounts()
      .then((traits) => {
        setTraitsFetched(traits);
      })
      .catch((error) => console.error(error));
  }, []);

  /* download the comments matching the trait */
  async function fetchComments() {
    if (!trait) {
      setAppStatus("awaiting trait selection...");
      return [];
    }
    // get all comments with the same trait
    const q = query(collection(db, "comments"), where("trait", "==", trait));
    const querySnapshot = await getDocs(q);
    const commentsFromServer = querySnapshot.docs
      .map((doc) => doc.data() as Comment)
      .sort((ca, cb) => (ca.text > cb.text ? 1 : -1));
    return commentsFromServer;
  }
  useEffect(() => {
    fetchComments()
      .then((comments) => {
        // append "create new comment" comment
        setCommentsFetched([
          { ...emptyComment, trait: trait || "othe-xx-undi" },
          ...comments,
        ]);
        setAppStatus("comments loaded from the selected trait!");
      })
      .catch((error) => {
        setAppStatus(`error occurred while fetching the traits: ${error}`);
      });
  }, [trait]);

  /* form changes */
  function handleTypeChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setType(target.value);
  }
  function handleTraitChange({ target }: React.ChangeEvent<HTMLSelectElement>) {
    setTrait(target.value as Trait);
  }
  function handleCommentChange({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) {
    const idx = parseInt(target.value);
    setCommentToEdit(commentsFetched[idx]);
  }

  /* Start JSX */
  return (
    <>
      <h3>Edit/create comments</h3>
      <div
        className="grid grid-cols-[5em,1fr] gap-x-4 gap-y-4
          justify-items-stretch items-begin"
      >
        <span>Type</span>
        <div className="flex gap-2 text-base flex-wrap">
          {Object.entries(typesList).map(([key, label]) => (
            <LabelButton
              key={`edit-type-${key}`}
              input={
                <Radio
                  id={`edit-type-${key}`}
                  value={key}
                  checked={type === key}
                  onChange={handleTypeChange}
                />
              }
            >
              {label}
            </LabelButton>
          ))}
        </div>
        <span>Traits</span>
        <div>
          <select
            className="select-multiple block w-full p-2 mt-1 bg-none font-mono"
            size={11}
            value={trait}
            onChange={handleTraitChange}
          >
            {traitsFetched
              .filter((key) => key.slice(0, 4) === type)
              .map((key) => (
                <option
                  key={key}
                  value={key}
                  className="font-mono font-light truncate"
                >
                  [{key}]{" "}
                  {traitsList[key] ? traitsList[key][1] : "EXPIRED TRAIT"}
                </option>
              ))}
          </select>
        </div>
        <span>Comments</span>
        <div>
          <select
            className="select-multiple block w-full p-2 mt-1 bg-none"
            size={7}
            onChange={handleCommentChange}
          >
            {commentsFetched &&
              commentsFetched.map((comment, idx) => (
                <option
                  key={comment.id}
                  value={idx}
                  className="font-mono font-light truncate"
                >
                  {comment.tone} {comment.text}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}
