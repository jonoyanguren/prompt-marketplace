import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { Title } from "../components";
import { getAllPrompts, getPromptsByCategory } from "../api/prompt";

import { Prompt } from "../types";
import { PromptItem } from "../components/Prompt/PromptItem";
import { CategoriesFilter } from "../components/Home/CategoriesFilter";
import { NoResults } from "../components/Prompt/NoResults";

export const Home = () => {
  const { t } = useTranslation();

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        let data;
        if (selectedCategory) {
          data = await getPromptsByCategory({ categoryId: selectedCategory });
        } else {
          data = await getAllPrompts();
        }
        setPrompts(data);
      } catch (error) {
        console.error("Error al obtener los prompts:", error);
      }
    };

    fetchPrompts();
  }, [selectedCategory]);

  return (
    <div>
      <Title>{t("home.title")}</Title>
      <div className="my-12">
        <CategoriesFilter
          filterByCategory={(category) => setSelectedCategory(category._id)}
          selectedCategory={selectedCategory}
        />
      </div>
      {prompts.length === 0 && <NoResults />}
      <div className="grid grid-cols-3 gap-8">
        {prompts.map((prompt) => (
          <PromptItem key={prompt._id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};
