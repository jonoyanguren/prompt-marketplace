import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Input, Title } from "../../components";
import { FormContainer } from "../../components/FormContainer";
import { useForm } from "../../hooks/useForm";
import { resendValidationCode, validateEmail } from "../../api/auth";
import { useState } from "react";

export const ValidateEmail = () => {
  const { t } = useTranslation();
  const { email } = useParams();
  const navigate = useNavigate();

  const { form, formFields, setErrors } = useForm({
    code: "",
    email,
  });
  const [apiErrors, setApiErrors] = useState<string | undefined>();
  const [resended, setResended] = useState(false);

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
  const doResendCode = async () => {
    try {
      await resendValidationCode({ email });
      setResended(true);
    } catch (error: any) {
      if (error.code === "API_ERROR") {
        setApiErrors(error.data.message);
      }
    }
  };
  const doValidateEmail = async () => {
    if (!validate()) return;

    try {
      await validateEmail({ code: form.code, email: form.email });
      navigate("/validation-success");
    } catch (error: any) {
      if (error.code === "API_ERROR") {
        setApiErrors(error.data.message);
      }
    }
  };

  return (
    <div>
      <FormContainer>
        <Title>{t("validateEmail.title")}</Title>
        <p className="my-8 text-sm text-gray-500">
          {t("validateEmail.description")}
        </p>
        <div className="mb-6">
          <p className="text-gray-500 mb-0">{t("validateEmail.resendText")}</p>
          <Button link className="mt-0" onClick={() => doResendCode()}>
            {t("validateEmail.resendButton")}
          </Button>
          {resended && (
            <p className="text-green-500">{t("validateEmail.resendSuccess")}</p>
          )}
        </div>
        <Input placeholder={t("validateEmail.code")} {...formFields("code")} />
        {apiErrors && <p className="text-red-500">{apiErrors}</p>}
        <Button className="mt-4" onClick={() => doValidateEmail()}>
          {t("validateEmail.button")}
        </Button>
      </FormContainer>
    </div>
  );
};
