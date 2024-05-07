import { Prompt } from "../../types";

export const PromptItem = ({ prompt }: { prompt: Prompt }) => {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white text-left">
      <div className="text-right">
        <p className="text-sm text-gray-500">Like (HEART EMPTY)</p>
        <p className="text-sm text-gray-500">
          You liked this prompt{" "}
          <span className="text-rose-500">HEART FULL</span>
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
