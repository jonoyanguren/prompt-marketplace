import { useParams } from "react-router-dom";
import { Subtitle, Title } from "../../components";
import { useEffect, useState } from "react";
import { Prompt } from "../../types";
import {
  downvotePrompt,
  getPromptById,
  getPromptsByCategory,
  upvotePrompt,
} from "../../api/prompt";
import { PromptCategories } from "../../components/Prompt/PromptCategories";
import { AiFillHeart } from "react-icons/ai";
import { getLikeNumbers } from "../../utils";
import { useTranslation } from "react-i18next";
import { MdVerified, MdShoppingCart } from "react-icons/md";

import { CopyButton } from "../../components/CopyButton";
import { CreatedByCard } from "../../components/Prompt/UserCard";
import { PromptItem } from "../../components/Prompt/PromptItem";
import { enqueueSnackbar } from "notistack";
import { API_URL } from "../../conf";

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

  const likePrompt = async () => {
    try {
      let data;
      if (prompt?.userHasUpvoted) {
        data = await downvotePrompt({ id: prompt!._id });
        enqueueSnackbar(t("promptDetail.unlikeSnack"), {
          variant: "warning",
        });
      } else {
        data = await upvotePrompt({ id: prompt!._id });
        enqueueSnackbar(t("promptDetail.likeSnack"), {
          variant: "success",
        });
      }
      setPrompt({
        ...prompt,
        upvotes: data.upvoteCount,
        userHasUpvoted: data.userHasUpvoted,
      } as Prompt);
    } catch (error) {
      console.error("Error al votar el prompt:", error);
    }
  };

  if (!prompt) return <p>No prompt found</p>;

  return (
    <div className="bg-white rounded-xl shadow p-16">
      <div className="text-left xl:flex pt-20">
        <div className="pr-8 flex flex-col gap-8">
          <div className="flex gap-4 justify-between w-full items-center">
            <PromptCategories categories={prompt.categories} />
            <div className="flex">
              {prompt.platforms.map((platform) => (
                <img
                  key={platform._id}
                  className="w-12 ml-2 rounded-md"
                  src={`${API_URL}/${platform.logo}`}
                  alt={platform.name}
                />
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <Title className="text-left">{prompt.title}</Title>
            <div onClick={() => likePrompt()}>
              <AiFillHeart
                className={`w-8 h-8 cursor-pointer ${
                  prompt.userHasUpvoted && "text-rose-600"
                }`}
              />
            </div>
          </div>
          <div className="flex gap-6 border-y border-gray-600">
            {/* Likes */}
            <div className="flex w-fit py-4 gap-2">
              <AiFillHeart className="w-5 h-5 text-rose-600" />
              <div className="text-gray-500">
                {getLikeNumbers(prompt.upvotes)}
              </div>
              <div className="text-gray-500">{t("general.likes")}</div>
            </div>

            {/* TODO: Sales, just placeholder */}
            <div className="flex w-fit py-4 gap-2">
              <MdShoppingCart className="text-gray-600 w-6 h-6" />
              <div className="text-gray-500">
                {getLikeNumbers(prompt.upvotes)}
              </div>
              <div className="text-gray-500">{t("general.sales")}</div>
            </div>

            {/* TODO: Tested, just placeholder */}
            <div className="flex w-fit py-4 gap-2">
              <MdVerified className="text-green-600 w-6 h-6" />
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
            similarPrompts.slice(0, 4).map((similarPrompt) => {
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
