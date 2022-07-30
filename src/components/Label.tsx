import React from "react";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {
  input: React.ReactElement;
}

export function Label({
  children,
  input,
  className,
  ...otherProps
}: LabelProps) {
  const disabled = input.props?.disabled;
  const labelProps = {
    className: `px-2 py-1 rounded flex items-center transition-colors
      ${disabled ? "disabled" : "hover:bg-gray-200 dark:hover:bg-gray-800"}
      ${className}`,
    htmlFor: input.props?.id,
    ...otherProps,
  };
  return (
    <label {...labelProps}>
      {input}
      <span className="ml-2">{children}</span>
    </label>
  );
}
