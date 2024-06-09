import { useTranslation } from "react-i18next";
import { Input } from "../../../components";
import { CategoriesFilter } from "../../../components/Home/CategoriesFilter";

export const BasicInfo = ({
  form,
  formFields,
  selectedCategory,
  setSelectedCategory,
}: {
  form: any;
  formFields: any;
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-3/4 p-8 text-left ml-8">
      <h1 className="text-3xl font-semibold mb-8">
        {t("createPrompt.basicInfoTitle")}
      </h1>
      {/* Name */}
      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.basicInfo.name")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.basicInfo.nameText")}
        </p>
        <Input
          placeholder={t("createPrompt.basicInfo.namePlaceholder")}
          {...formFields("title")}
        />
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.basicInfo.description")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.basicInfo.nameText")}
        </p>
        <Input
          type="textarea"
          placeholder={t("createPrompt.basicInfo.descriptionPlaceholder")}
          {...formFields("description")}
        />
        <p className="text-xs text-gray-500">{form.description.length}/140</p>
      </div>

      {/* Who is for */}
      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.basicInfo.description")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.basicInfo.nameText")}
        </p>
        <Input
          type="textarea"
          placeholder={t("createPrompt.basicInfo.whoIsForPlaceholder")}
          {...formFields("whoIsFor")}
        />
        <p className="text-xs text-gray-500">{form.whoIsFor.length}/140</p>
      </div>
      <div>
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.basicInfo.description")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.basicInfo.nameText")}
        </p>
        <CategoriesFilter
          onlySelector
          multiple
          filterByCategory={(category) => {
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
      </div>
    </div>
  );
};
