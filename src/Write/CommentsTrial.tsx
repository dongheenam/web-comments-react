import { useEffect, useState } from "react";
import { useFirebase } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";

interface Comment {
  comment: string;
  type: string | undefined;
}
interface ServerComment {
  id: string;
  comment: string;
  type: string | undefined;
}
interface RadioValues {
  "type-submit"?: string;
  "type-view"?: string;
}
type HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

export default function Comments() {
  const [commentsDB, setCommentsDB] = useState<Array<ServerComment>>([]);
  const [comment, setComment] = useState<Comment>();
  const [radioValues, setRadioValues] = useState<RadioValues>({
    "type-view": "all",
  });
  const db = useFirebase().db;

  /* handle radios */
  const handleRadioChange: HandleChange = ({
    target: { value, name, checked },
  }) => {
    if (checked) {
      setRadioValues({
        ...radioValues,
        [name]: value,
      });
    }
  };

  /* upload comments */
  async function fetchComments() {
    const queryType =
      radioValues["type-view"] === "all"
        ? where("type", "!=", null)
        : where("type", "==", radioValues["type-view"]);

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, queryType);
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map(
      (doc) => doc.data() as ServerComment
    );
    setCommentsDB(comments);
  }
  useEffect(() => {
    fetchComments();
  }, [radioValues["type-view"]]);

  /* download comments */
  async function uploadComment() {
    try {
      const newDocRef = doc(collection(db, "comments"));
      await setDoc(newDocRef, {
        ...comment,
        id: newDocRef.id,
      });
      console.log("comment uploaded with ref: ", newDocRef);
      fetchComments();
    } catch (error) {
      console.error("error uploading comment: ", error);
    }
  }

  return (
    <>
      <h2>Upload comment</h2>
      <span>Comment types: </span>
      <input
        type="text"
        value={comment?.comment}
        onChange={(e) =>
          setComment({
            comment: e.target.value,
            type: radioValues["type-submit"],
          })
        }
      />
      <label>
        <input
          type="radio"
          name="type-submit"
          value="academic"
          checked={"academic" === radioValues["type-submit"]}
          onChange={(e) => handleRadioChange(e)}
        />
        Academic
      </label>
      <label>
        <input
          type="radio"
          name="type-submit"
          value="behaviour"
          checked={"behaviour" === radioValues["type-submit"]}
          onChange={(e) => handleRadioChange(e)}
        />
        Behaviour
      </label>
      <label>
        <input
          type="radio"
          name="type-submit"
          value="assessment"
          checked={"assessment" === radioValues["type-submit"]}
          onChange={(e) => handleRadioChange(e)}
        />
        Assessment
      </label>

      <p>
        Upload comment &quot;{comment?.comment}&quot; with type:{" "}
        {radioValues && radioValues["type-submit"]}
      </p>
      <button onClick={uploadComment}>Upload</button>
      <h2>Uploaded comments</h2>
      <label>
        <input
          type="radio"
          name="type-view"
          value="all"
          checked={"all" === radioValues["type-view"]}
          onChange={(e) => handleRadioChange(e)}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          name="type-view"
          value="academic"
          checked={"academic" === radioValues["type-view"]}
          onChange={(e) => handleRadioChange(e)}
        />
        Academic
      </label>
      <label>
        <input
          type="radio"
          name="type-view"
          value="behaviour"
          checked={"behaviour" === radioValues["type-view"]}
          onChange={(e) => handleRadioChange(e)}
        />
        Behaviour
      </label>
      <label>
        <input
          type="radio"
          name="type-view"
          value="assessment"
          checked={"assessment" === radioValues["type-view"]}
          onChange={(e) => handleRadioChange(e)}
        />
        Assessment
      </label>
      <div>
        View comments with type: {radioValues && radioValues["type-view"]}
      </div>
      <hr />
      {commentsDB.map((comment) => (
        <div key={comment.id}>
          {comment.id} {"=>"} {`[${comment.type}] `} {comment.comment}
        </div>
      ))}
    </>
  );
}
