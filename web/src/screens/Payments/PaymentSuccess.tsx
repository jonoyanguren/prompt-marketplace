import { Button, Title } from "../../components";
import success from "../../assets/success.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center mt-12">
      <img className="w-52 h-52" src={success} alt="success" />
      <Title className="text-2xl">{t("paymentSuccess.title")}</Title>
      <p className="text-gray-500">{t("paymentSuccess.text")}</p>
      <Button onClick={() => navigate("/profile")}>
        {t("paymentSuccess.button")}
      </Button>
    </div>
  );
};
