import React from "react";

interface TraitButtonProps extends React.ComponentPropsWithoutRef<"label"> {
  input: React.ReactElement;
}

export default function TraitButton({
  children,
  input,
  className,
  ...otherProps
}: TraitButtonProps) {
  const disabled = input.props?.disabled;
  const labelProps = {
    className: `btn-tri${disabled ? " disabled" : ""} ${className}`,
    htmlFor: input.props?.id,
    ...otherProps,
  };
  const inputProps = {
    className: "hidden",
  };
  return (
    <div>
      {React.cloneElement(input, inputProps)}
      <label {...labelProps}>{children}</label>
    </div>
  );
}
