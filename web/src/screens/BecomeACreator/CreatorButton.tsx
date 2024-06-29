import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components";

export const CreatorButton = ({
  registeredAction,
  noRegisteredAction,
}: {
  registeredAction: () => void;
  noRegisteredAction: () => void;
}) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        user.creator ? (
          <Button className="w-full">{t("benefits.alreadyCreator")}</Button>
        ) : (
          <Button className="w-full" onClick={() => registeredAction()}>
            {t("benefits.creatorRegistered")}
          </Button>
        )
      ) : (
        <Button className="w-full" onClick={() => noRegisteredAction()}>
          {t("benefits.creatorButton")}
        </Button>
      )}
    </>
  );
};
