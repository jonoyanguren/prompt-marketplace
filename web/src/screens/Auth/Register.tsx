import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { FormContainer } from "../../components/FormContainer";
import { useForm } from "../../hooks/useForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { useContext, useState } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { loading, setLoading } = useContext(LoadingContext);
  console.log("LOADING", loading);

  const [apiErrors, setApiErrors] = useState<string>();

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
      form.email.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ===
      null
    ) {
      errors.email = t("errors.invalidEmail");
      result = false;
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

    setLoading(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        creator: state?.creator || false,
      });
      navigate(`/validate-email/${form.email}`);
    } catch (error: any) {
      setApiErrors(error.data.code);
      console.error("doRegister error", error);
    } finally {
      setLoading(false);
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
        {apiErrors && (
          <div className="mt-4">
            <p className="text-red-500">{t(apiErrors)}</p>
          </div>
        )}
        <Button loading={loading} className="mt-4" onClick={() => doRegister()}>
          {t("register.button")}
        </Button>
      </FormContainer>
    </div>
  );
};
