import { HeartFull } from "../../assets/icons/HeartFull";
import { Prompt } from "../../types";

export const PromptItem = ({ prompt }: { prompt: Prompt }) => {
  const getLikesNumber = (likes: number) => {
    if (likes < 1000) return likes;
    if (likes < 1000000) return (likes / 1000).toFixed(1) + "K";
    if (likes < 1000000000) return (likes / 1000000).toFixed(1) + "M";
    return (likes / 1000000000).toFixed(1) + "B";
  };
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white text-left">
      <div className="flex justify-end mb-8 items-center">
        <HeartFull className="text-red-500" />
        <p className="text-sm text-gray-500 ml-1">
          {getLikesNumber(prompt.upvotes)}
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
      <div className="flex gap-2 flex-wrap my-4">
        {prompt.categories.map((category) => (
          <p
            key={category._id}
            className="py-1 px-3 rounded-lg text-sm uppercase"
            style={{
              color: category.textColor,
              backgroundColor: category.bgColor,
            }}
          >
            {category.title}
          </p>
        ))}
      </div>
      <div className="flex gap-2 mt-2 justify-end">
        {prompt.platforms.map((platform) => (
          <img key={platform._id} className="w-8" src={platform.logo} />
        ))}
      </div>
    </div>
  );
};
