import React from "react";

export default function Explanation({
  children,
  className,
  ...otherProps
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={`text-base text-gray-500 ${className}`} {...otherProps}>
      {children}
    </div>
  );
}
