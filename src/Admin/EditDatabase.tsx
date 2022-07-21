import { useState } from "react";
import { Trait } from "../Comments";
import Button from "../components/Button";
import Explanation from "../components/Explanation";
import EditComment from "./EditComment";
import SelectTrait from "./SelectTrait";

export default function EditDatabase() {
  const [traitToEdit, setTraitToEdit] = useState<Trait>("othe-xx-undi");
  const [appStatus, setAppStatus] = useState<string>("awating input...");
  const [mode, setMode] = useState<"edit-trait" | "edit-comment">(
    "edit-comment"
  );

  return (
    <>
      <h3>Edit database</h3>
      <SelectTrait
        traitToEdit={traitToEdit}
        setTraitToEdit={setTraitToEdit}
        setAppStatus={setAppStatus}
      />
      <div className="mt-4 ml-[5em] pl-4 flex gap-2">
        <Button
          variant={mode === "edit-comment" ? "solid" : "outline"}
          onClick={() => setMode("edit-comment")}
        >
          Edit comments
        </Button>
        <Button
          variant={mode === "edit-trait" ? "solid" : "outline"}
          onClick={() => setMode("edit-trait")}
        >
          Edit trait
        </Button>
      </div>
      <hr />

      {mode === "edit-comment" ? (
        <EditComment traitToEdit={traitToEdit} setAppStatus={setAppStatus} />
      ) : (
        <span>Trait edit</span>
      )}

      <div className="ml-[5em] pl-4">
        <Explanation>Status: {appStatus}</Explanation>
      </div>
    </>
  );
}
