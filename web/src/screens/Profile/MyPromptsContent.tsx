import { useEffect, useState } from "react";
import { getMyPrompts } from "../../api/prompt";
import { Prompt } from "../../types";

export const MyPromptsContent = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchMyPrompts = async () => {
      try {
        const res = await getMyPrompts();
        setPrompts(res);
      } catch (error) {
        console.error("Error fetching my prompts", error);
      }
    };

    fetchMyPrompts();
  }, []);
  return (
    <div className="text-left">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="m-4 flex justify-between">
          <div>
            <div className="">{prompt.title}</div>
          </div>
          <div className="flex gap-2">
            <p>Editar</p>
            <p>Borrar</p>
          </div>
        </div>
      ))}
    </div>
  );
};
