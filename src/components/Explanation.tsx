/* eslint-disable react/prop-types */
import React from "react";

export function Explanation({
  children,
  className,
  ...otherProps
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={`explanation ${className}`} {...otherProps}>
      {children}
    </div>
  );
}
