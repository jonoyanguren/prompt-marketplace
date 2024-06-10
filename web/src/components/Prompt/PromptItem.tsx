import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { Prompt } from "../../types";
import { PromptCategories } from "./PromptCategories";
import { getLikeNumbers } from "../../utils";
import { API_URL } from "../../conf";

export const PromptItem = ({
  prompt,
  noLink,
}: {
  prompt: Prompt;
  noLink?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`p-6 rounded-xl shadow-lg bg-white text-left flex flex-col justify-between ${
        !noLink && "cursor-pointer"
      }`}
      onClick={() => {
        if (noLink) return;
        navigate(`/prompt/${prompt._id}`, {
          state: { prompt },
        });
      }}
    >
      <div className="flex justify-end mb-8 items-center">
        <AiFillHeart className="w-5 h-5 text-red-500" />
        <p className="text-sm text-gray-500 ml-1">
          {getLikeNumbers(prompt.upvotes)}
        </p>
      </div>
      <p className="font-bold text-lg text-gray-900">{prompt.title}</p>
      <p className="text-sm my-2 underline text-gray-800">
        {prompt.createdBy.name}
      </p>
      <p className="text-sm font-medium text-gray-500">
        {prompt.description.slice(0, 140)}
        {prompt.description.length > 140 ? "..." : ""}
      </p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {prompt.tags.map((tag) => (
          <div key={tag}>
            <span className="text-sm font-medium text-gray-500">#{tag}</span>
          </div>
        ))}
      </div>

      <PromptCategories categories={prompt.categories} />

      <div className="flex gap-2 mt-6 justify-end">
        {prompt.platforms.map((platform) => (
          <img
            key={platform._id}
            className="w-9 rounded-full"
            src={`${API_URL}/${platform.logo}`}
          />
        ))}
      </div>
    </div>
  );
};
