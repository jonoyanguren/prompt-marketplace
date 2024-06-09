import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { getMyPrompts } from "../../api/prompt";
import { Prompt } from "../../types";
import { Button } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const MyPromptsContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  if (prompts.length === 0) return <NoPrompts />;

  return (
    <div className="text-left pt-12">
      <div className="text-right mb-8">
        <Button onClick={() => navigate("/create-prompt")}>
          {t("myPromptsContent.button")}
        </Button>
      </div>
      {prompts.map((prompt) => (
        <div key={prompt._id} className="m-4 flex justify-between">
          <div>
            <div className="">{prompt.title}</div>
          </div>
          <div className="flex gap-2">
            <MdEdit
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => console.log("EDIT PROMPT", prompt._id)}
            />
            <MdDelete
              className="w-6 h-6 text-rose-600 cursor-pointer"
              onClick={() => console.log("DELETE PROMPT", prompt._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const NoPrompts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="pt-16">
      <p className="text-gray-900 text-4xl font-bold mb-4">
        {t("myPromptsContent.noPromptsTitle")}
      </p>
      <p className="text-gray-500 mb-4 text-thin">
        {t("myPromptsContent.text")}
      </p>
      <Button onClick={() => navigate("/create-prompt")}>
        {t("myPromptsContent.button")}
      </Button>
    </div>
  );
};
