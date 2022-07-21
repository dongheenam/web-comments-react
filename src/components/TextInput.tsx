interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export default function TextInput({
  label,
  id,
  className,
  ...otherProps
}: TextInputProps) {
  const textInputProps = {
    type: "text",
    id: id,
    className: `input-text w-full ${className}`,
    ...otherProps,
  };
  return (
    <>
      <label htmlFor={id}>
        <span className="explanation">{label}</span>
        <input {...textInputProps} />
      </label>
    </>
  );
}
