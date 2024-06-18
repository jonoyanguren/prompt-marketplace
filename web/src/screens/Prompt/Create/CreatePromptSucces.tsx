import { useTranslation } from "react-i18next";
import { Button, Title } from "../../../components";
import empty from "../../../assets/empty.png";
import { useNavigate } from "react-router-dom";

export const CreatePromptSucces = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="mt-12">
      <img className="w-52 h-52 m-auto mb-6" src={empty} />
      <Title>{t("createPromptSuccess.title")}</Title>
      <p className="text-xl text-gray-500 mt-4">
        {t("createPromptSuccess.text")}
      </p>
      <Button className="mt-4" onClick={() => navigate("/profile")}>
        {t("createPromptSuccess.button")}
      </Button>
    </div>
  );
};
