export const Subtitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const baseStyles = "text-lg font-bold dark:text-white mb-2";

  return <h1 className={`${baseStyles} ${className}`}>{children}</h1>;
};
