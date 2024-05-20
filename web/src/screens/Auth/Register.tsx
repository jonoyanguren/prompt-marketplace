import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { FormContainer } from "../../components/FormContainer";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
  const { t } = useTranslation();
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
    console.log("doRegister", form);
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
        <Button onClick={() => doRegister()}>Submit</Button>
      </FormContainer>
    </div>
  );
};
