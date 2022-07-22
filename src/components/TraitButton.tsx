import React from "react";

interface TraitButtonProps extends React.ComponentPropsWithoutRef<"label"> {
  input: React.ReactElement;
  containerProps?: React.ComponentPropsWithoutRef<"div">;
}

export function TraitButton({
  children,
  input,
  className,
  containerProps,
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
    <div {...containerProps}>
      {React.cloneElement(input, inputProps)}
      <label {...labelProps}>{children}</label>
    </div>
  );
}
