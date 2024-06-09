import { useTranslation } from "react-i18next";
import { get } from "../../services/localStorage.service";
import { Category } from "../../types";

export const CategoriesFilter = ({
  selectedCategory,
  filterByCategory,
  onlySelector = false,
  multiple = false,
}: {
  selectedCategory: string | string[];
  filterByCategory: (category: Category) => void;
  onlySelector?: boolean;
  multiple?: boolean;
}) => {
  const { t } = useTranslation();
  const config = get("config");

  const checkIfIsSelected = (category: Category) => {
    if (!multiple) {
      if (category._id === selectedCategory) return true;
    } else {
      if (selectedCategory.includes(category._id)) return true;
    }
    return false;
  };

  if (!config || !config.categories) return null;
  if (onlySelector) {
    return (
      <div className="flex gap-2 justify-center p-4 flex-wrap">
        {config.categories.map((category: Category) => {
          return (
            <div
              key={category._id}
              onClick={() => filterByCategory(category)}
              className={`py-1 px-6 bg-white border rounded-full cursor-pointer  ${
                checkIfIsSelected(category)
                  ? "border-sky-600"
                  : "border-gray-300"
              }`}
            >
              {category.title}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex gap-2 justify-center p-4 flex-wrap">
      <div
        onClick={() =>
          filterByCategory({ _id: "all", title: "All" } as Category)
        }
        className={`py-1 px-6 bg-white border rounded-full cursor-pointer  ${
          selectedCategory === "all" ? "border-sky-600" : "border-gray-300"
        }`}
      >
        {t("home.allCategories")}
      </div>
      {config.categories.map((category: Category) => {
        return (
          <div
            key={category._id}
            onClick={() => filterByCategory(category)}
            className={`py-1 px-6 bg-white border rounded-full cursor-pointer  ${
              selectedCategory === category._id
                ? "border-sky-600"
                : "border-gray-300"
            }`}
          >
            {category.title}
          </div>
        );
      })}
    </div>
  );
};
