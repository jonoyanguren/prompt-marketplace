interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "bg-orange-400 my-1 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded";
  const disabledStyles = "bg-gray-400 cursor-not-allowed opacity-50";
  const buttonStyles = disabled
    ? `${baseStyles} ${disabledStyles}`
    : baseStyles;

  return (
    <button
      disabled={disabled}
      className={`${buttonStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
