import { Subtitle, Title } from "../../components";
import { PromptCategories } from "../../components/Prompt/PromptCategories";
import { AiFillHeart } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { MdVerified, MdShoppingCart } from "react-icons/md";

import { CopyButton } from "../../components/CopyButton";
import { API_URL } from "../../conf";
import { Platform, Prompt } from "../../types";

export const PromptPreview = ({ prompt }: { prompt: Prompt }) => {
  const { t } = useTranslation();

  if (!prompt) {
    return <div>No prompt data available</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow w-full px-16">
      <div className="text-left xl:flex">
        <div className="pr-8 flex flex-col gap-8 w-full pb-12">
          <div className="flex gap-4 justify-between w-full items-center">
            <PromptCategories categories={prompt.categories} />
            <div className="flex">
              {prompt.platforms.map((platform: Platform) => (
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
            <div>
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
              <div className="text-gray-500">0</div>
              <div className="text-gray-500">{t("general.likes")}</div>
            </div>

            {/* TODO: Sales, just placeholder */}
            <div className="flex w-fit py-4 gap-2">
              <MdShoppingCart className="text-gray-600 w-6 h-6" />
              <div className="text-gray-500">0</div>
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
              {prompt.tags.map((tag: string) => (
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
      </div>
    </div>
  );
};
