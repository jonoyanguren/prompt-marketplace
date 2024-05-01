export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-display text-3xl font-black xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
      {children}
    </h1>
  );
};
