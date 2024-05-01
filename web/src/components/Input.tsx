interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
  ...props
}: InputProps) => {
  const baseStyles =
    "appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500";
  const inputStyles = className ? `${baseStyles} ${className}` : baseStyles;
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputStyles}
      {...props}
    />
  );
};
