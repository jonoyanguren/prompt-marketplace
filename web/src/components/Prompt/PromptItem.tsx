import { Prompt } from "../../types";
import { AuthorCard } from "./AuthorCard";

export const PromptItem = ({ prompt }: { prompt: Prompt }) => {
  console.log("PROMPT", prompt);
  return (
    <div className="p-4 rounded-xl border-slate-500 border">
      <p className="font-bold text-xl">{prompt.title}</p>
      <p className="text-sm text-slate-500">{prompt.description}</p>
      <AuthorCard createdBy={prompt.createdBy} />
      <div className="flex gap-2 mt-2">
        {prompt.tags.map((tag) => (
          <div
            key={tag}
            className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
          >
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {prompt.platforms.map((platform) => (
          <div
            key={platform}
            className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
          >
            <span>{platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
