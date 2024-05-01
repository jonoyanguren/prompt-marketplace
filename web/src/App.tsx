import { Button, Input, Title } from "./components";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <div>
        <button className="m-4" onClick={() => i18n.changeLanguage("en")}>
          English
        </button>
        <button className="m-4" onClick={() => i18n.changeLanguage("es")}>
          Español
        </button>
      </div>
      <Title>{t("title")}</Title>
      <Input name="name" value="value" onChange={() => {}} />
      <Button>Button</Button>
    </div>
  );
}

export default App;
