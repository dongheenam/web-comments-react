export type RadioProps = React.ComponentPropsWithoutRef<"input">;

export function Radio({
  className = "",
  disabled = false,
  onChange,
  ...otherProps
}: RadioProps) {
  const radioProps = {
    className: `radio${disabled ? " disabled" : ""} ${className}`,
    ...otherProps,
  };
  return (
    <input
      type="radio"
      onChange={onChange}
      disabled={disabled}
      {...radioProps}
    />
  );
}
