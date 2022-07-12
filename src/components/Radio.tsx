export interface RadioProps {
  className?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [otherProps: string]: any;
}

export default function Radio({
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
