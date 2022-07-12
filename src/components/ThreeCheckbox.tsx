import React, { useEffect, useRef, useState } from "react";

type ThreeCheckboxProps = React.ComponentPropsWithoutRef<"input">;

export default function ThreeCheckbox({ ...otherProps }: ThreeCheckboxProps) {
  const [status, setStatus] = useState(1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      switch (status) {
        case 0:
          inputRef.current.checked = false;
          break;
        case 1:
          inputRef.current.checked = false;
          inputRef.current.indeterminate = true;
          break;
        case 2:
          inputRef.current.checked = true;
      }
    }
  }, [status]);

  return (
    <>
      <input
        ref={inputRef}
        type="checkbox"
        onChange={() => setStatus((status + 1) % 3)}
        {...otherProps}
      />
    </>
  );
}
