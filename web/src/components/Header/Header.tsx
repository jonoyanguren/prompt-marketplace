import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const Header = () => {
  const { t, i18n } = useTranslation();

  const { user, logout } = useContext(AuthContext);
  console.log("USER in context", user);

  return (
    <>
      <div>
        <button className="m-2" onClick={() => i18n.changeLanguage("en")}>
          English
        </button>
        <button className="m-2" onClick={() => i18n.changeLanguage("es")}>
          Español
        </button>
      </div>

      {user && (
        <div className="bg-teal-500 text-white p-4">
          {t("welcome")} - {user.email}
        </div>
      )}
      <header>
        <Link className="mr-4 text-teal-600" to="/">
          {t("header.home")}
        </Link>
        <Link className="mr-4 text-teal-600" to="/platforms">
          {t("header.platforms")}
        </Link>
        <Link className="mr-4 text-teal-600" to="/how-it-works">
          {t("header.howItWorks")}
        </Link>
        <Link className="mr-4 text-teal-600" to="/become-creator">
          {t("header.becomeCreator")}
        </Link>
        {!user ? (
          <Link className="mr-4 text-teal-600" to="/login">
            {t("header.login")}
          </Link>
        ) : (
          <Button onClick={() => logout()}>{t("header.logout")}</Button>
        )}
      </header>
    </>
  );
};
