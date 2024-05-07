import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { Title } from "../components";
import {
  getAllPrompts,
  getPromptsByCategory,
  getPromptsByText,
} from "../api/prompt";

import { Prompt } from "../types";
import { PromptItem } from "../components/Prompt/PromptItem";
import { CategoriesFilter } from "../components/Home/CategoriesFilter";
import { NoResults } from "../components/Prompt/NoResults";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PromptItemSkeleton } from "../components/Prompt/PromptItemSkeleton";

export const Home = () => {
  const { t } = useTranslation();

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // TODO Remove this
  async function waitSeconds(seconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        await waitSeconds(1.5);
        let data;
        if (!selectedCategory || selectedCategory === "all") {
          data = await getAllPrompts();
        } else {
          data = await getPromptsByCategory({ categoryId: selectedCategory });
        }
        setPrompts(data);
      } catch (error) {
        console.error("Error al obtener los prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [selectedCategory]);

  const executeSearch = async () => {
    const prompts = await getPromptsByText({ text: search });
    setPrompts(prompts);
  };

  return (
    <div>
      <Title>{t("home.title")}</Title>
      <div className="max-w-xl mx-auto mt-12">
        <div className="relative">
          <SearchSVG />
          <input
            type="search"
            id="default-search"
            className="bg-white w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
            placeholder={t("home.searchPlaceholder")}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            required
          />
          <button
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => executeSearch()}
          >
            {t("home.search")}
          </button>
        </div>
      </div>

      <div className="mt-4 mb-12">
        <CategoriesFilter
          filterByCategory={(category) => setSelectedCategory(category._id)}
          selectedCategory={selectedCategory}
        />
      </div>
      {loading && (
        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <PromptItemSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && prompts.length === 0 && <NoResults />}
      <div className="grid grid-cols-3 gap-8">
        {prompts.map((prompt) => (
          <PromptItem key={prompt._id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

const SearchSVG = () => (
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  </div>
);
