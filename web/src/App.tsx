import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import routes, { Routes } from "./routes.tsx";

import "./App.css";

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div>
        <button className="m-2" onClick={() => i18n.changeLanguage("en")}>
          English
        </button>
        <button className="m-2" onClick={() => i18n.changeLanguage("es")}>
          Español
        </button>
      </div>

      <header>
        <Link className="mr-4 text-teal-600" to="/">
          {t("header.home")}
        </Link>
        <Link className="mr-4 text-teal-600" to="/how-it-works">
          {t("header.howItWorks")}
        </Link>
        <Link className="mr-4 text-teal-600" to="/become-creator">
          {t("header.becomeCreator")}
        </Link>
        <Link className="mr-4 text-teal-600" to="/login">
          {t("header.login")}
        </Link>
      </header>
      <div className="p-8">
        <Routes />
      </div>
    </div>
  );
}

export default App;
