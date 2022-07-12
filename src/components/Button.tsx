import React from "react";

/* https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/ */
export type ButtonProps<C extends React.ElementType> = {
  as?: C;
  variant?: "solid" | "outline" | "text";
  color?: "default" | "primary" | "red" | "green";
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  className?: string;
  children: string | React.ReactElement;
} & React.ComponentPropsWithoutRef<C>;

export default function Button<C extends React.ElementType>({
  as,
  variant = "text",
  color = "default",
  disabled = false,
  className = "",
  leftIcon,
  rightIcon,
  children,
  ...otherProps
}: ButtonProps<C>) {
  let defaultClass = "btn inline-flex justify-center align-middle";
  // common to all colors
  switch (variant) {
    case "solid":
      defaultClass += " text-gray-100 dark:text-gray-950";
      break;
    case "outline":
      defaultClass += " border-current";
  }

  if (disabled) {
    defaultClass += " disabled";
  }

  // red text is "red", primary filled is "primary-f", etc.
  const scheme = `${color}${variant === "solid" ? "-f" : ""}`;
  switch (scheme) {
    /* text and outlined buttons */
    case "default":
      if (!disabled) {
        defaultClass += " hover:bg-gray-200 dark:hover:bg-gray-800";
        defaultClass += " active:bg-gray-300 dark:active:bg-gray-700";
      }
      break;
    case "primary":
      defaultClass += " text-primary-600 dark:text-primary-400";
      if (!disabled) {
        defaultClass += " hover:bg-primary-100 dark:hover:bg-primary-900/md";
        defaultClass += " active:bg-primary-200 dark:active:bg-primary-900";
      }
      break;
    case "red":
      defaultClass += " text-red-600 dark:text-red-400";
      if (!disabled) {
        defaultClass += " hover:bg-gray-200 dark:hover:bg-gray-800";
        defaultClass += " active:bg-gray-300 dark:active:bg-gray-700";
      }
      break;
    case "green":
      defaultClass += " text-green-600 dark:text-green-400";
      if (!disabled) {
        defaultClass += " hover:bg-gray-200 dark:hover:bg-gray-800";
        defaultClass += " active:bg-gray-300 dark:active:bg-gray-700";
      }
      break;
    case "default-f":
      defaultClass += " bg-gray-800 dark:bg-gray-400";
      if (!disabled) {
        defaultClass += " hover:bg-gray-700 dark:hover:bg-gray-300";
        defaultClass += " active:bg-gray-600 dark:active:bg-gray-200";
      }
      break;
    case "primary-f":
      defaultClass += " bg-primary-500 dark:bg-primary-300";
      if (!disabled) {
        defaultClass += " hover:bg-primary-600 dark:hover:bg-primary-400";
        defaultClass += " active:bg-primary-700 dark:active:bg-primary-500";
      }
      break;
    case "red-f":
      defaultClass += " bg-red-500 dark:bg-red-300";
      if (!disabled) {
        defaultClass += " hover:bg-red-600 dark:hover:bg-red-400";
        defaultClass += " active:bg-red-700 dark:active:bg-red-500";
      }
      break;
    case "green-f":
      defaultClass += " bg-green-500 dark:bg-green-300";
      if (!disabled) {
        defaultClass += " hover:bg-green-600 dark:hover:bg-green-400";
        defaultClass += " active:bg-green-700 dark:active:bg-green-500";
      }
  }
  const Component = as || "button";
  const buttonProps = {
    className: `${defaultClass} ${className}`,
    ...otherProps,
  };
  const innerComponent = (
    <span className="inline-flex gap-2">
      {leftIcon} {children} {rightIcon}
    </span>
  );
  return <Component {...buttonProps}>{innerComponent}</Component>;
}
