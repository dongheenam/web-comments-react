interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export default function TextInput({
  label,
  id,
  ...otherProps
}: TextInputProps) {
  return (
    <>
      <label htmlFor={id}>
        <span className="text-base text-gray-600 dark:text-gray-300">
          {label}
        </span>
        <input type="text" className="input-text w-full" {...otherProps} />
      </label>
    </>
  );
}
