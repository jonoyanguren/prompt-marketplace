import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { useForm } from "../../hooks/useForm";
import { resetPassword } from "../../api/auth";

export const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  console.log("TOKEN", token);
  const { form, formFields, setErrors } = useForm({
    password: "",
    passwordConfirm: "",
  });

  const validate = () => {
    let result = true;
    const errors: Record<string, string | undefined> = {};

    if (!form.password) {
      errors.password = t("errors.required");
      result = false;
    }

    if (form.password !== form.passwordConfirm) {
      errors.passwordConfirm = t("errors.passwordsDontMatch");
      result = false;
    }

    setErrors(errors);
    return result;
  };

  const doReset = async () => {
    if (!validate()) return;
    if (!token) return;
    try {
      const res = await resetPassword({ token, password: form.password });
      console.log("RESET", res);
      navigate("/reset-password-success");
    } catch (error) {
      console.error("Error al reset password:", error);
    }
  };
  return (
    <div>
      <Title>{t("resetPassword.title")}</Title>
      <FormContainer>
        <Input
          type="password"
          placeholder={t("resetPassword.passwordPlaceholder")}
          {...formFields("password")}
        />
        <Input
          type="password"
          placeholder={t("resetPassword.confirmPasswordPlaceholder")}
          {...formFields("passwordConfirm")}
        />
        <Button onClick={() => doReset()}>{t("resetPassword.submit")}</Button>
      </FormContainer>
    </div>
  );
};
