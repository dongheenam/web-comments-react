import React from "react";

export interface LabelButtonProps
  extends React.ComponentPropsWithoutRef<"label"> {
  input: React.ReactElement;
}

export default function LabelButton({
  children,
  input,
  className,
  ...otherProps
}: LabelButtonProps) {
  const disabled = input.props?.disabled;
  const labelProps = {
    className: `btn-label${disabled ? " disabled" : ""} ${className}`,
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
