type CheckboxProps = React.ComponentPropsWithoutRef<"input">;

export default function Checkbox({
  className = "",
  disabled = false,
  ...otherProps
}: CheckboxProps) {
  const checkboxProps = {
    className: `checkbox${disabled ? " disabled" : ""} ${className}`,
    disabled: disabled,
    ...otherProps,
  };
  return <input type="checkbox" {...checkboxProps} />;
}
