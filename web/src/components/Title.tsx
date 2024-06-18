export const Title = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const baseStyles = "font-display text-4xl font-semibold font-black";

  return <p className={`${baseStyles} ${className}`}>{children}</p>;
};
