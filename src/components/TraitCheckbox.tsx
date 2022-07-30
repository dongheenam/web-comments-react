import React, { useEffect, useRef } from "react";

interface TraitCheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  status: number;
}

export function TraitCheckbox({ status, ...otherProps }: TraitCheckboxProps) {
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
      <input ref={inputRef} type="checkbox" {...otherProps} />
    </>
  );
}
