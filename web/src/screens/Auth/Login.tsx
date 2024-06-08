import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/auth";

import { Button, Input, Title } from "../../components";
import { useForm } from "../../hooks/useForm";
import { FormContainer } from "../../components/FormContainer";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = () => {
  const { t } = useTranslation();
  const { updateToken, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { form, formFields, setErrors } = useForm({
    email: "jon@localhost.com",
    password: "password",
  });
  const [apiErrors, setApiErrors] = useState<
    Record<string, string | undefined> | undefined
  >(undefined);

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

    setErrors(errors);
    return result;
  };
  const doLogin = async () => {
    setApiErrors(undefined);
    if (!validate()) return;

    try {
      const user = await login({
        email: form.email,
        password: form.password,
      });

      console.log("USER", user);

      updateToken(user.token);
      updateUser(user);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      if (error.code === "API_ERROR") {
        setApiErrors(error.data);
      }
    }
  };

  return (
    <div>
      <Title>{t("login.title")}</Title>
      <FormContainer>
        <Input
          className="mb-4"
          placeholder={t("login.emailPlaceholder")}
          {...formFields("email")}
        />
        <Input
          type="password"
          className="mb-4"
          placeholder={t("login.passwordPlaceholder")}
          {...formFields("password")}
        />
        {apiErrors && (
          <div className="my-8 bg-rose-100 border border-rose-500 rounded-xl p-4">
            <p className="text-rose-500">{apiErrors.message}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Link to="/register" className="text-indigo-600 underline">
            {t("login.registerLink")}
          </Link>
          <Link to="/forgot-password" className="text-indigo-600 underline">
            {t("login.forgotPasswordLink")}
          </Link>
        </div>
        <Button className="mt-4" onClick={() => doLogin()}>
          {t("login.submit")}
        </Button>
      </FormContainer>
    </div>
  );
};
