import { useTranslation } from "react-i18next";
import { PromptItem } from "../../../components/Prompt/PromptItem";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { get } from "../../../services/localStorage.service";
import { Category, Platform } from "../../../types";
import { useNavigate } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
import { updateUser } from "../../../api/user";
import { platform } from "os";
import { create } from "domain";
import { table } from "console";
import { PromptPreview } from "../PromptPreview";

export const PreviewAndPublish = ({
  form,
  selectedCategories,
  selectedPlatforms,
}: {
  form: any;
  selectedCategories: string[];
  selectedPlatforms: string[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const config = get("config");

  const filteredPlatforms = config.platforms.filter((platform: Platform) =>
    selectedPlatforms.includes(platform._id)
  );

  const filteredCategories = config.categories.filter((category: Category) =>
    selectedCategories.includes(category._id)
  );

  const previewPrompt = {
    ...form,
    upvotes: 0,
    categories: filteredCategories,
    platforms: filteredPlatforms,
    createdBy: user,
    tags: [],
  };

  const handleNavigate = () => {
    const promptStr = encodeURIComponent(JSON.stringify(previewPrompt));
    window.open(`/prompt-preview?prompt=${promptStr}`, "_blank");
  };

  return (
    <div className="w-3/4 p-8 text-left ml-8">
      <h1 className="text-3xl font-semibold mb-8">
        {t("createPrompt.preview.title")}
      </h1>

      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.preview.subtitle")}
        </p>
        <p className="text-gray-500">{t("createPrompt.preview.text")}</p>
      </div>

      <div className="w-1/2">
        <PromptItem noLink prompt={previewPrompt} />
      </div>
      <hr className="my-8" />
      <div className="w-full">
        <PromptPreview prompt={previewPrompt} />
      </div>
    </div>
  );
};
