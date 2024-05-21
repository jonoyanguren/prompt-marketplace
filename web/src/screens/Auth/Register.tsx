import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { FormContainer } from "../../components/FormContainer";
import { useForm } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { form, formFields, setErrors } = useForm({
    name: "Jon",
    email: "jon@localhost.com",
    password: "password",
    confirmPassword: "password",
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

    if (!form.password) {
      errors.password = t("errors.required");
      result = false;
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = t("errors.required");
      result = false;
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = t("errors.passwordDoesNotMatch");
      result = false;
    }

    setErrors(errors);
    return result;
  };

  const doRegister = async () => {
    if (!validate()) return;

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/validate-email");
    } catch (error: any) {
      console.log("doRegister error", error);
    }
  };
  return (
    <div>
      <Title>{t("register.title")}</Title>
      <FormContainer>
        <Input
          className="mb-4"
          placeholder={t("register.name")}
          {...formFields("name")}
        />
        <Input
          className="mb-4"
          placeholder={t("register.email")}
          {...formFields("email")}
        />
        <Input
          type="password"
          className="mb-4"
          placeholder={t("register.password")}
          {...formFields("password")}
        />
        <Input
          type="password"
          className="mb-4"
          placeholder={t("register.confirmPassword")}
          {...formFields("confirmPassword")}
        />
        <div className="flex justify-end">
          <Link to="/login" className="text-indigo-600 underline">
            {t("register.loginLink")}
          </Link>
        </div>
        <Button className="mt-4" onClick={() => doRegister()}>
          Submit
        </Button>
      </FormContainer>
    </div>
  );
};
