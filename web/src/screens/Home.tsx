import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { Title } from "../components";
import { getAllPrompts } from "../api/prompt";

import { Prompt } from "../types";
import { PromptItem } from "../components/Prompt/PromptItem";

export const Home = () => {
  const { t } = useTranslation();

  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await getAllPrompts();
        setPrompts(data);
      } catch (error) {
        console.error("Error al obtener los prompts:", error);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div>
      <Title>{t("home.title")}</Title>
      <div className="flex gap-2">
        {prompts.map((prompt) => (
          <PromptItem key={prompt._id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};
