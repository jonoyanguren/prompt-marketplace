import "./App.css";
import { useTranslation } from "react-i18next";
import "./i18n";
import { Button, Input, Title } from "./components";
import { ChangeEvent } from "react";

function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>
        <div>
          <button className="m-2" onClick={() => i18n.changeLanguage("en")}>
            English
          </button>
          <button className="m-2" onClick={() => i18n.changeLanguage("es")}>
            Español
          </button>
        </div>
        <Title>{t("title")}</Title>
        <Input name={""} value={""} onChange={() => console.log("INPUT")} />
        <Button>Button</Button>
      </div>
    </>
  );
}

export default App;
