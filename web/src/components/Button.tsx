interface ButtonProps {
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  link?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  primary,
  secondary,
  outline,
  link,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  // const variant = primary
  //   ? "primary"
  //   : secondary
  //   ? "secondary"
  //   : link
  //   ? "link"
  //   : "primary";

  const getVariant = () => {
    if (primary) {
      return "primary";
    } else if (secondary) {
      return "secondary";
    } else if (outline) {
      return "outline";
    } else if (link) {
      return "link";
    }

    return "primrary";
  };

  const variant = getVariant();

  const baseStyles =
    "my-1 font-medium py-2 px-4 rounded-lg transition-colors duration-200";
  const primaryStyles =
    "bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 text-white";

  const secondaryStyles =
    "hover:bg-gray-100 active:bg-gray-200 border boder-gray-200 text-gray-900";

  const disabledStyles = "bg-gray-400 cursor-not-allowed opacity-50";

  const outlineStyles =
    "border border-indigo-500 text-indigo-500 hover:bg-indigo-100 active:bg-indigo-200";

  const linkStyles = "text-indigo-500 hover:no-underline";

  const getButtonStyles = () => {
    if (disabled) {
      return `${baseStyles} ${disabledStyles} ${className}`;
    }

    switch (variant) {
      case "primary":
        return `${baseStyles} ${primaryStyles} ${className}`;
      case "secondary":
        return `${baseStyles} ${secondaryStyles} ${className}`;
      case "outline":
        return `${baseStyles} ${outlineStyles} ${className}`;
      case "link":
        return `${baseStyles} ${linkStyles} ${className}`;
      default:
        return `${baseStyles} ${primaryStyles} ${className}`;
    }
  };

  return (
    <button
      disabled={disabled}
      className={getButtonStyles()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
