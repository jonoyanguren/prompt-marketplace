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
  const baseStyles =
    "w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-900 focus:outline-none focus:border-indigo-600";

  if (type === "textarea") {
    return (
      <div className={`${className}`}>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          className={`h-32 ${baseStyles} ${
            errorMessage ? "border-rose-500" : ""
          }`}
          {...props}
        />
        <p className="text-xs text-rose-500 m-0 mt-2 text-left">
          {errorMessage}
        </p>
      </div>
    );
  }
  return (
    <div className={`${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`${baseStyles} ${errorMessage ? "border-rose-500" : ""}`}
        {...props}
      />
      <p className="text-xs text-rose-500 m-0 mt-2 text-left">{errorMessage}</p>
    </div>
  );
};
