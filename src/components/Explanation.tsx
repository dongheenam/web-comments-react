import React from "react";

export default function Explanation({
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className="text-base text-gray-500">{children}</div>;
}
