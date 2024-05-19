import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button, Title } from "../components";
import {
  getAllPrompts,
  getPromptsByCategory,
  getPromptsByText,
} from "../api/prompt";

import { Prompt } from "../types";
import { PromptItem } from "../components/Prompt/PromptItem";
import { CategoriesFilter } from "../components/Home/CategoriesFilter";
import { NoResults } from "../components/Prompt/NoResults";
import { PromptItemSkeleton } from "../components/Prompt/PromptItemSkeleton";

export const Home = () => {
  const { t } = useTranslation();

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [timesFetched, setTimesFetched] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const prevSelectedCategory = useRef(selectedCategory);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        let data;
        if (!selectedCategory || selectedCategory === "all") {
          data = await getAllPrompts({ timesFetched: 0 });
        } else {
          data = await getPromptsByCategory({
            categoryId: selectedCategory,
            timesFetched: 0,
          });
        }
        setTimesFetched(timesFetched + 1);
        setPrompts(data);
      } catch (error) {
        console.error("Error al obtener los prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (prevSelectedCategory.current !== selectedCategory) {
      console.log("CAMBIO CAEGORIA");
      setTimesFetched(0);
      setHasMore(true);
      prevSelectedCategory.current = selectedCategory;
    }

    fetchPrompts();
  }, [selectedCategory]);

  const executeSearch = async () => {
    setLoading(true);
    setTimesFetched(0);
    setHasMore(true);
    const prompts = await getPromptsByText({ text: search });
    if (prompts.length === 0) {
      setHasMore(false);
    }
    setPrompts(prompts);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    setTimesFetched(timesFetched + 1);
    const hasToFetchWithCategory =
      selectedCategory && selectedCategory !== "all";

    let newPrompts;
    if (!hasToFetchWithCategory) {
      newPrompts = await getAllPrompts({ timesFetched });
    } else {
      newPrompts = await getPromptsByCategory({
        categoryId: selectedCategory,
        timesFetched,
      });
    }

    if (newPrompts.length === 0) {
      setHasMore(false);
      return;
    }

    setPrompts([...prompts, ...newPrompts]);
  };

  return (
    <div>
      <Title>{t("home.title")}</Title>
      <div className="max-w-xl mx-auto mt-12">
        <div className="relative">
          <SearchSVG />
          <div className="flex gap-2">
            <input
              type="search"
              id="default-search"
              className="bg-white w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
              placeholder={t("home.searchPlaceholder")}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              required
            />
            <Button
              className="absolute right-2.5 top-0.5"
              onClick={() => executeSearch()}
            >
              {t("home.search")}
            </Button>
          </div>
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

      <InfiniteScroll
        className="grid grid-cols-3 gap-8"
        dataLength={prompts.length}
        next={fetchMoreData}
        endMessage={
          prompts.length !== 0 && <EndOfResults text={t("home.endOfResults")} />
        }
        hasMore={hasMore}
        loader={<h4>Loading of results...</h4>}
      >
        {prompts.map((prompt) => (
          <PromptItem key={prompt._id} prompt={prompt} />
        ))}
      </InfiniteScroll>
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

const EndOfResults = ({ text }: { text: string }) => (
  <div className="p-6 rounded-xl shadow-lg bg-white text-left cursor-pointer">
    <p className="text-center text-gray-500 dark:text-gray-400">{text}</p>
  </div>
);
