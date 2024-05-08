import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { useForm } from "../../hooks/useForm";
import { FormContainer } from "../../components/FormContainer";
import { save } from "../../services/localStorage.service";

import { login } from "../../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, formFields, setErrors } = useForm({
    username: "",
    password: "",
  });
  const [apiErrors, setApiErrors] = useState<
    Record<string, string | undefined> | undefined
  >(undefined);

  const validate = () => {
    let result = true;
    const errors: Record<string, string | undefined> = {};

    if (!form.username) {
      errors.username = t("errors.required");
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

    console.log("FORM", form);
    try {
      const res = await login({
        username: form.username,
        password: form.password,
      });

      console.log("RES", res);
      save("token", res.token);
      save("user", res);
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
      <Title>Login</Title>
      <FormContainer>
        <Input
          className="mb-4"
          placeholder={t("login.usernamePlaceholder")}
          {...formFields("username")}
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
        <Button onClick={() => doLogin()}>{t("login.submit")}</Button>
      </FormContainer>
    </div>
  );
};
