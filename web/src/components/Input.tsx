interface InputProps {
  type?: string;
  name: string;
  value: any;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export const Input = ({
  type = "text",
  name,
  value,
  errorMessage,
  onFocus,
  onChange,
  placeholder,
  className,
  ...props
}: InputProps) => {
  //TODO change color
  const baseStyles =
    "w-full bg-white border border-gray-300 rounded-md mb-0 py-2 px-4 text-gray-700 focus:outline-none focus:border-gray-400";
  const inputStyles = className ? `${baseStyles} ${className}` : baseStyles;
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className={inputStyles}
        {...props}
      />
      <p className="text-xs text-red-500 m-0 text-right mt-1">{errorMessage}</p>
    </div>
  );
};
