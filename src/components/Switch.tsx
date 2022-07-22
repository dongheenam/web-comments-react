import React from "react";

interface SwitchProps extends React.ComponentPropsWithoutRef<"input"> {
  containerProps?: React.ComponentPropsWithoutRef<"div">;
}

export function Switch({
  className = "",
  disabled = false,
  containerProps,
  ...otherProps
}: SwitchProps) {
  const switchProps = {
    className: `${disabled ? " disabled" : ""} ${className}`,
    disabled: disabled,
    ...otherProps,
  };
  return (
    <div className={`switch ${className}`} {...containerProps}>
      <input type="checkbox" {...switchProps} />
      <div className="s-slider" />
      <div className="s-thumb" />
    </div>
  );
}
