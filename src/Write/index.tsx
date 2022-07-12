import { useState } from "react";
import Trait from "../components/Trait";

export default function Write() {
  const [status, setStatus] = useState(1);
  return (
    <>
      <h1>Write</h1>
      <label htmlFor="tcb">
        <Trait
          id="tcb"
          className="checkbox"
          status={status}
          onClick={() => setStatus((status + 1) % 3)}
        />
        Current status: {status}
      </label>
    </>
  );
}
