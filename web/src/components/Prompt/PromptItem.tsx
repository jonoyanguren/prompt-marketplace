import { Prompt } from "../../types";

export const PromptItem = ({ prompt }: { prompt: Prompt }) => {
  console.log("PROMTP", prompt);
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white text-left">
      <p className="font-bold text-lg text-gray-900">{prompt.title}</p>
      {/* <p className="text-sm my-2 underline text-gray-800">
        {prompt.createdBy.name}
      </p> */}
      <p className="text-sm font-medium text-gray-500">{prompt.description}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {prompt.tags.map((tag) => (
          <div key={tag}>
            <span className="text-sm font-medium text-gray-500">#{tag}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap my-4">
        <p
          className="py-1 px-3 rounded-lg text-sm uppercase"
          style={{
            color: prompt.categories.textColor,
            backgroundColor: prompt.categories.bgColor,
          }}
        >
          {prompt.categories.title}
        </p>
      </div>
      <div className="flex gap-2 mt-2 justify-end">
        {prompt.platforms.map((platform) => (
          <img className="w-8" src={platform.logo} />
        ))}
      </div>
    </div>
  );
};
