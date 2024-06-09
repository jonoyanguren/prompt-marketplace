import { useTranslation } from "react-i18next";
import { Input } from "../../../components";
import { CategoriesFilter } from "../../../components/Home/CategoriesFilter";
import { get } from "../../../services/localStorage.service";
import { Platform } from "../../../types";
import { API_URL } from "../../../conf";

export const PromptInfo = ({
  form,
  formFields,
  selectedCategory,
  setSelectedCategory,
  errorCategory,
  setErrorCategory,
  selectedPlatform,
  setSelectedPlatform,
  errorPlatform,
  setErrorPlatform,
}: {
  form: any;
  formFields: any;
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
  errorCategory: string | undefined;
  setErrorCategory: (error: string | undefined) => void;
  selectedPlatform: string[] | undefined;
  setSelectedPlatform: (platform: string[]) => void;
  errorPlatform: string | undefined;
  setErrorPlatform: (error: string | undefined) => void;
}) => {
  const { t } = useTranslation();
  const config = get("config");
  const platforms = config?.platforms || [];

  return (
    <div className="w-3/4 p-8 text-left ml-8">
      <h1 className="text-3xl font-semibold mb-8">
        {t("createPrompt.promptInfo.title")}
      </h1>
      {/* Categories */}
      <div>
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.promptInfo.categories")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.promptInfo.categoriesText")}
        </p>
        <CategoriesFilter
          onlySelector
          multiple
          filterByCategory={(category) => {
            setErrorCategory(undefined);
            if (selectedCategory.includes(category._id)) {
              setSelectedCategory(
                selectedCategory.filter((id) => id !== category._id)
              );
            } else {
              if (selectedCategory.length >= 2) return;
              setSelectedCategory([...selectedCategory, category._id]);
            }
          }}
          selectedCategory={selectedCategory}
        />
        {errorCategory && (
          <p className="text-rose-500 text-xs">{errorCategory}</p>
        )}
      </div>

      {/* Platforms */}
      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.promptInfo.platforms")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.promptInfo.platformsText")}
        </p>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform: Platform) => (
            <div
              key={platform._id}
              className={`flex items-center mb-2 border border-gray-300 w-fit p-4 rounded-full
              ${
                selectedPlatform && selectedPlatform.includes(platform._id)
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => {
                setErrorPlatform(undefined);
                setSelectedPlatform(
                  selectedPlatform && selectedPlatform.includes(platform._id)
                    ? selectedPlatform.filter((id) => id !== platform._id)
                    : [...selectedPlatform!, platform._id]
                );
              }}
            >
              <img
                src={`${API_URL}/${platform.logo}`}
                className="w-6 h-6 mr-2"
                alt=""
              />
              {platform.name}
            </div>
          ))}
        </div>
        {errorPlatform && (
          <p className="text-rose-500 text-xs">{errorPlatform}</p>
        )}
      </div>

      {/* Prompt */}
      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.promptInfo.prompt")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.promptInfo.promptText")}
        </p>
        <Input
          type="textarea"
          placeholder={t("createPrompt.promptInfo.promptPlaceholder")}
          {...formFields("prompt")}
        />
      </div>
    </div>
  );
};
