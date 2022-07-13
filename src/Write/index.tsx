/*
 * IDEAS:
 *   - putting a button next to each generated comment to change its "strength"
 *   - calculating effort grade using the traits and strength
 */

import { useState } from "react";
import TraitCheckbox from "../components/TraitCheckbox";

export default function Write() {
  const [status, setStatus] = useState(1);
  return (
    <>
      <h1>Write</h1>
      <label htmlFor="tcb">
        <TraitCheckbox
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
