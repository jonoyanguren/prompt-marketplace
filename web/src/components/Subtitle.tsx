export const Subtitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const baseStyles = "text-xl font-semibold mb-2";

  return <h1 className={`${baseStyles} ${className}`}>{children}</h1>;
};
