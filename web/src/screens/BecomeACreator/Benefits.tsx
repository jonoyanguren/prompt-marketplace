import { useTranslation } from "react-i18next";
import { Button, Title } from "../../components";
import { FaCheckCircle } from "react-icons/fa";

export const Benefits = () => {
  const { t } = useTranslation();
  console.log(t("benefits.userBenefits"));
  const userBenefits: string[] = t("benefits.userBenefits", {
    returnObjects: true,
  });

  return (
    <div>
      <p className="text-2xl mb-12 text-center">{t("benefits.title")}</p>
      <div className="flex justify-center gap-12">
        <div className="bg-white p-8 shadow-xl rounded-2xl w-[350px] pb-20">
          <Title>{t("benefits.user")}</Title>
          <p className="my-6">{t("benefits.userText")}</p>
          <Button secondary className="bg-gray-300 mb-6 w-full">
            {t("benefits.userButton")}
          </Button>
          {userBenefits.map((benefit: string) => (
            <div className="flex gap-6 my-3 items-center text-lg">
              <FaCheckCircle />
              <p className="text-gray-500">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 text-gray-50 shadow-xl p-8 rounded-2xl w-[350px] pb-20">
          <Title>{t("benefits.creator")}</Title>
          <p className="my-6">{t("benefits.creatorText")}</p>
          <Button className="w-full mb-6">{t("benefits.creatorButton")}</Button>
          {userBenefits.map((benefit: string) => (
            <div className="flex gap-6 my-3 items-center text-lg">
              <FaCheckCircle />
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
