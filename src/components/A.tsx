interface AProps extends React.ComponentPropsWithoutRef<"a"> {
  children: string | React.ReactNode;
  href: string;
  blank?: boolean;
  className?: string;
}

export default function A({
  children,
  href,
  blank = false,
  className = "",
  ...otherProps
}: AProps) {
  const aProps = {
    href: href,
    target: blank ? "_blank" : "",
    rel: blank ? "noreferrer" : "",
    className: `text-secondary-600 dark:text-secondary-400 hover:underline ${className}`,
    ...otherProps,
  };
  return <a {...aProps}>{children}</a>;
}
