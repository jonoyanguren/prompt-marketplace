export const Title = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const baseStyles =
    "font-display text-3xl font-black xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl";

  return <h1 className={`${baseStyles} ${className}`}>{children}</h1>;
};
