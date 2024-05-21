import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { FormContainer } from "../../components/FormContainer";
import { useForm } from "../../hooks/useForm";

export const ValidateEmail = () => {
  const { t } = useTranslation();
  const { form, formFields, setErrors } = useForm({
    code: "",
  });

  const validate = () => {
    let result = true;
    const errors: Record<string, string | undefined> = {};

    if (!form.code) {
      errors.code = t("errors.required");
      result = false;
    }

    setErrors(errors);
    return result;
  };
  const validateEmail = () => {
    if (!validate()) return;
    console.log("FORM", form);
  };

  return (
    <div>
      <FormContainer>
        <Title>{t("validateEmail.title")}</Title>
        <p className="my-8 text-sm text-gray-500">
          {t("validateEmail.description")}
        </p>
        <Input placeholder={t("validateEmail.code")} {...formFields("code")} />
        <Button className="mt-4" onClick={() => validateEmail()}>
          {t("validateEmail.button")}
        </Button>
      </FormContainer>
    </div>
  );
};
