import { useParams } from "react-router-dom";
import { Button, Subtitle, Title } from "../../components";
import { useEffect, useState } from "react";
import { Prompt } from "../../types";
import { getPromptById } from "../../api/prompt";
import { PromptCategories } from "../../components/Prompt/PromptCategories";
import { HeartFull } from "../../assets/icons/HeartFull";
import { getLikeNumbers } from "../../utils";
import { useTranslation } from "react-i18next";
import { Cart } from "../../assets/icons/Cart";
import { Check } from "../../assets/icons/Check";
import { CopyButton } from "../../components/CopyButton";
import { CreatedByCard } from "../../components/Prompt/UserCard";

export const PromptDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<Prompt | null>(null);

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

  if (loading) return <p>Loading</p>;
  if (!prompt) return <p>No prompt found</p>;

  return (
    <div className="text-left bg-white p-16 rounded-xl shadow xl:flex pt-20">
      <div className="pr-8 flex flex-col gap-8">
        <PromptCategories categories={prompt.categories} />
        <div className="flex items-end">
          <Title className="text-left">{prompt.title}</Title>
          <HeartFull className="w-16 h-16" />
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
  );
};
