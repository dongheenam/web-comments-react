import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { typesList, traitsList, Trait } from "../Comments";
import LabelButton from "../components/LabelButton";
import Radio from "../components/Radio";
import { useFirebase } from "../firebase";

interface SelectCommentProps {
  traitToEdit: Trait;
  setTraitToEdit: React.Dispatch<React.SetStateAction<Trait>>;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectTrait({
  traitToEdit,
  setTraitToEdit,
  setAppStatus,
}: SelectCommentProps) {
  const [traitsFetched, setTraitsFetched] = useState<Array<Trait>>([]);
  const [type, setType] = useState<string>(Object.keys(typesList)[0]);

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
        setAppStatus("loaded traits from server! Ready to begin...");
      })
      .catch((error) => console.error(error));
  }, []);

  /* form changes */
  function handleTypeChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setType(target.value);
  }
  function handleTraitChange({ target }: React.ChangeEvent<HTMLSelectElement>) {
    setTraitToEdit(target.value as Trait);
  }

  /* Start JSX */
  return (
    <>
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
            className="select-multiple block w-full p-2 mt-1 bg-none truncate"
            size={11}
            value={traitToEdit}
            onChange={handleTraitChange}
          >
            {traitsFetched
              .filter((key) => key.slice(0, 4) === type)
              .map((key) => (
                <option key={key} value={key}>
                  [{key}]{" "}
                  {traitsList[key] ? traitsList[key][1] : "EXPIRED TRAIT"}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}
