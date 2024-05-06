import { useState } from "react";

interface UseFormProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useForm = (initialValues: UseFormProps) => {
  const [form, setForm] = useState<UseFormProps>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleInputChange = (
    event: { target: { value: any } },
    field: string
  ) => {
    const { value } = event.target;
    setForm({ ...form, [field]: value });
  };

  const clearForm = () => {
    setForm(initialValues);
  };

  const formFields = (field: string) => {
    if (Object.keys(initialValues).indexOf(field) === -1) {
      console.error(
        `USEFORM: You need to provide a initial value in the form for ${field}`
      );
    }

    return {
      name: field,
      value: form[field as keyof UseFormProps],
      onChange: (e: { target: { value: any } }) => handleInputChange(e, field),
      validationState: errors[field] ? "invalid" : undefined,
      errorMessage: errors[field],
      onFocus: () => setErrors({ ...errors, [field]: undefined }),
    };
  };

  return { form, formFields, clearForm, setErrors, setForm };
};
