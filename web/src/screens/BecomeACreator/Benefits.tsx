import { useTranslation } from "react-i18next";
import { Button, Modal, Title } from "../../components";
import { FaCheckCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { CommunityGuidelines } from "./CommunityGuidelines";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { becomeACreator } from "../../api/user";
import { CreatorButton } from "./CreatorButton";

export const Benefits = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const userBenefits: string[] = t("benefits.userBenefits", {
    returnObjects: true,
  });
  const creatorBenefits: string[] = t("benefits.creatorBenefits", {
    returnObjects: true,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const doBecomeACreator = async () => {
    try {
      setLoading(true);
      await becomeACreator();
      navigate("/profile");
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <CommunityGuidelines
          close={() => doBecomeACreator()}
          loading={loading}
        />
      </Modal>

      <Title className="mb-12 text-center">{t("benefits.title")}</Title>
      <div className="flex justify-center gap-12">
        <div className="bg-white p-8 shadow-xl rounded-2xl w-[350px] pb-20">
          <Title>{t("benefits.user")}</Title>
          <p className="my-6">{t("benefits.userText")}</p>
          {user ? (
            <Button secondary className="bg-gray-300 mb-6 w-full">
              {t("benefits.userRegistered")}
            </Button>
          ) : (
            <Button
              secondary
              className="bg-gray-300 mb-6 w-full"
              onClick={() => navigate("/register")}
            >
              {t("benefits.userButton")}
            </Button>
          )}
          {userBenefits.map((benefit: string) => (
            <div
              key={benefit.substring(0, 10)}
              className="flex gap-4 my-3 items-center text-lg"
            >
              <FaCheckCircle />
              <p className="text-gray-500">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 text-gray-50 shadow-xl p-8 rounded-2xl w-[350px] pb-20">
          <Title>{t("benefits.creator")}</Title>
          <p className="my-6">{t("benefits.creatorText")}</p>
          <CreatorButton
            registeredAction={() => setOpen(true)}
            noRegisteredAction={() =>
              navigate("/register", { state: { creator: true } })
            }
          />

          {creatorBenefits.map((benefit: string) => (
            <div
              key={benefit.substring(0, 10)}
              className="flex gap-4 my-3 items-center text-lg"
            >
              <FaCheckCircle />
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
