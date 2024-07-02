import { Button } from "../../components";
import guidelines from "../../assets/becomeACreator/guidelines.png";
import { useTranslation } from "react-i18next";

export const CommunityGuidelines = ({
  close,
  loading,
}: {
  close: () => void;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        className="m-auto mb-12"
        src={guidelines}
        alt="Community Guidelines"
      />

      <div>
        <p className="text-center text-2xl mb-6">
          {t("communityGuidelines.title")}
        </p>
        <p className="text-gray-500 mb-6">{t("communityGuidelines.text")}</p>
      </div>

      <div className="text-left mb-6">
        <p className="font-medium text-xl mb-4">
          {t("communityGuidelines.originalAuthenticity")}
        </p>
        <p className="text-gray-500">
          {t("communityGuidelines.ofiginalAuthenticityText")}
        </p>
      </div>

      <div className="text-left mb-6">
        <p className="font-medium text-xl mb-4">
          {t("communityGuidelines.qualityAndUsefulness")}
        </p>
        <p className="text-gray-500">
          {t("communityGuidelines.qualityAndUsefulnessText")}
        </p>
      </div>

      <div className="text-left mb-6">
        <p className="font-medium text-xl mb-4">
          {t("communityGuidelines.ethical")}
        </p>
        <p className="text-gray-500">{t("communityGuidelines.ethicalText")}</p>
      </div>

      <Button className="w-full" loading={loading} onClick={() => close()}>
        {t("communityGuidelines.button")}
      </Button>
    </div>
  );
};
