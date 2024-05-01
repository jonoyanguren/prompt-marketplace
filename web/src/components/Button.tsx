interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button = ({ children, disabled, ...props }: ButtonProps) => {
  const baseStyles =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const disabledStyles = "bg-gray-400 cursor-not-allowed opacity-50";
  const buttonStyles = disabled
    ? `${baseStyles} ${disabledStyles}`
    : baseStyles;

  return (
    <button disabled={disabled} className={buttonStyles} {...props}>
      {children}
    </button>
  );
};
