import { collection, Firestore, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { typesList, traitsList, Trait } from "../Comments";
import { LabelButton, Radio } from "../components";

interface SelectCommentProps {
  db: Firestore;
  traitToEdit: Trait;
  setTraitToEdit: React.Dispatch<React.SetStateAction<Trait>>;
  setAppStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectTrait({
  db,
  traitToEdit,
  setTraitToEdit,
  setAppStatus,
}: SelectCommentProps) {
  const [traitsFetched, setTraitsFetched] = useState<Array<Trait>>([]);
  const [type, setType] = useState<string>(Object.keys(typesList)[0]);

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
        // merge fetched list with local list
        const mergedTraitCodes = [
          ...traits,
          ...Object.keys(traitsList),
        ] as Trait[];
        setTraitsFetched([...new Set(mergedTraitCodes)].sort());
        setAppStatus("loaded traits from server! Ready to begin... ");
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
  useEffect(() => {
    const firstTrait = traitsFetched.filter(
      (key) => key.slice(0, 4) === type
    )[0];
    setTraitToEdit(firstTrait);
  }, [type]);

  /* Start JSX */
  return (
    <>
      <h3>Traits</h3>
      <div className="mb-4 flex gap-2 text-base flex-wrap">
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
              [{key}] {traitsList[key] ? traitsList[key][1] : "EXPIRED TRAIT"}
            </option>
          ))}
      </select>
    </>
  );
}
