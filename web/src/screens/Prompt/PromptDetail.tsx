import { useParams } from "react-router-dom";
import { Subtitle, Title } from "../../components";
import { useEffect, useState } from "react";
import { Prompt } from "../../types";
import { getPromptById, getPromptsByCategory } from "../../api/prompt";
import { PromptCategories } from "../../components/Prompt/PromptCategories";
import { HeartFull } from "../../assets/icons/HeartFull";
import { getLikeNumbers } from "../../utils";
import { useTranslation } from "react-i18next";
import { Cart } from "../../assets/icons/Cart";
import { Check } from "../../assets/icons/Check";
import { CopyButton } from "../../components/CopyButton";
import { CreatedByCard } from "../../components/Prompt/UserCard";
import { PromptItem } from "../../components/Prompt/PromptItem";
import { enqueueSnackbar } from "notistack";

export const PromptDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [similarPrompts, setSimilarPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchPromptById = async () => {
      try {
        setLoading(true);
        const data = await getPromptById({ id });
        setPrompt(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el prompt:", error);
      }
    };

    fetchPromptById();
  }, [id]);

  useEffect(() => {
    if (!prompt) return;

    const fetchSimilarPrompts = async () => {
      try {
        setLoading(true);
        const data = await getPromptsByCategory({
          categoryId: prompt.categories[0]._id,
        });
        setSimilarPrompts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los prompts:", error);
      }
    };

    fetchSimilarPrompts();
  }, [prompt]);

  if (loading) return <p>Loading</p>;
  if (!prompt) return <p>No prompt found</p>;

  return (
    <div className="bg-white rounded-xl shadow p-16">
      <div className="text-left xl:flex pt-20">
        <div className="pr-8 flex flex-col gap-8">
          <PromptCategories categories={prompt.categories} />
          <div className="flex items-end">
            <Title className="text-left">{prompt.title}</Title>
            <div
              onClick={() =>
                enqueueSnackbar(t("promptDetail.likeSnack"), {
                  variant: "success",
                })
              }
            >
              <HeartFull size={40} className="w-16 h-16" />
            </div>
          </div>
          <div className="flex gap-6 border-y border-gray-600">
            {/* Likes */}
            <div className="flex w-fit py-4 gap-2">
              <HeartFull className="text-rose-600" />
              <div className="text-gray-500">
                {getLikeNumbers(prompt.upvotes)}
              </div>
              <div className="text-gray-500">{t("general.likes")}</div>
            </div>

            {/* TODO: Sales, just placeholder */}
            <div className="flex w-fit py-4 gap-2">
              <Cart className="text-gray-600" />
              <div className="text-gray-500">
                {getLikeNumbers(prompt.upvotes)}
              </div>
              <div className="text-gray-500">{t("general.sales")}</div>
            </div>

            {/* TODO: Tested, just placeholder */}
            <div className="flex w-fit py-4 gap-2">
              <Check className="text-green-600" />
              <div className="text-gray-500">{t("general.tested")}</div>
            </div>
          </div>

          <div>
            <Subtitle>{t("promptDetail.description")}</Subtitle>
            <p className="text-left text-gray-500">{prompt.description}</p>
          </div>

          <div>
            <Subtitle>{t("promptDetail.prompt")}</Subtitle>
            <CopyButton className="float-right" text={prompt.prompt} />
            <p className="text-left text-gray-500 bg-yellow-100 p-8 pt-12 font-mono text-sm">
              {prompt.prompt}
            </p>
          </div>

          <div>
            <Subtitle>{t("promptDetail.tags")}</Subtitle>
            <div className="flex gap-2">
              {prompt.tags.map((tag) => (
                <p
                  key={tag}
                  className="text-left text-gray-800 bg-gray-100 py-1 px-2 text-xs rounded"
                >
                  #{tag}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 ml-8 sm:mt-12">
          <CreatedByCard author={prompt.createdBy} />
        </div>
      </div>
      {/* Similar Prompts */}
      <div className="mt-12">
        <Subtitle className="text-left">
          {t("promptDetail.similarPrompts")}
        </Subtitle>
        <div className="flex gap-4 mt-8">
          {similarPrompts.length > 0 &&
            similarPrompts.map((similarPrompt) => {
              if (similarPrompt._id === prompt._id) return null;
              return (
                <PromptItem key={similarPrompt._id} prompt={similarPrompt} />
              );
            })}
        </div>
      </div>
    </div>
  );
};
