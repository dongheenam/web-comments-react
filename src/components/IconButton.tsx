import React from "react";
import Button, { ButtonProps } from "./Button";

type ButtonIconProps<C extends React.ElementType> = Omit<
  ButtonProps<C>,
  "leftIcon" | "rightIcon" | "children"
> & {
  icon: React.ReactElement;
  "aria-label": string;
} & React.ComponentPropsWithoutRef<C>;

export default function IconButton<C extends React.ElementType>({
  icon,
  className = "p-2 px-2 font-semibold rounded-md border border-transparent",
  ...otherProps
}: ButtonIconProps<C>) {
  const iconButtonProps = {
    className: `p-2 px-2 font-semibold rounded-md border border-transparent ${className}`,
    ...otherProps,
  };
  return <Button {...iconButtonProps}>{icon}</Button>;
}
