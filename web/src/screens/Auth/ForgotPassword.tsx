import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { useForm } from "../../hooks/useForm";
import { FormContainer } from "../../components/FormContainer";
import { forgotPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, formFields, setErrors } = useForm({
    email: "",
  });

  const validate = () => {
    let result = true;
    const errors: Record<string, string | undefined> = {};

    if (
      form.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ===
      null
    ) {
      errors.email = t("errors.invalidEmail");
    }

    if (!form.email) {
      errors.email = t("errors.required");
      result = false;
    }

    setErrors(errors);
    return result;
  };

  const doForgot = async () => {
    if (!validate()) return;
    try {
      await forgotPassword({ email: form.email });
      navigate("/forgot-password-success");
    } catch (error) {
      console.error("Error al forgot password:", error);
    }
  };

  return (
    <div>
      <Title>{t("forgotPassword.title")}</Title>
      <FormContainer>
        <Input
          placeholder={t("forgotPassword.emailPlaceholder")}
          {...formFields("email")}
        />
        <Button onClick={() => doForgot()}>{t("forgotPassword.submit")}</Button>
      </FormContainer>
    </div>
  );
};
