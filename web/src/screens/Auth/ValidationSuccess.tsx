import { useTranslation } from "react-i18next";
import { Button, Title } from "../../components";
import success from "../../assets/success.png";
import { useNavigate } from "react-router-dom";

export const ValidationSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="mt-12 text-center flex flex-col justify-center p-8 shadow-xl rounded-xl bg-white ">
      <div className="text-center w-1/2 m-auto">
        <img className="my-12 w-64 h-64 m-auto" src={success} alt="" />
        <Title>{t("validationSuccess.title")}</Title>
        <p className="my-6 text-gray-500">{t("validationSuccess.text")}</p>
        <Button onClick={() => navigate("/login")}>
          {t("validationSuccess.button")}
        </Button>
      </div>
    </div>
  );
};
