import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { getMyPrompts } from "../../api/prompt";
import { Prompt } from "../../types";
import { Button, Input } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { useForm } from "../../hooks/useForm";

export const MyPromptsContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const { form, formFields } = useForm({
    searchText: "",
  });

  useEffect(() => {
    const fetchMyPrompts = async () => {
      try {
        const res = await getMyPrompts();
        setPrompts(res);
        setFilteredPrompts(res);
      } catch (error) {
        console.error("Error fetching my prompts", error);
      }
    };

    fetchMyPrompts();
  }, []);

  useEffect(() => {
    if (form.searchText) {
      setFilteredPrompts(
        prompts.filter((prompt) =>
          prompt.title.toLowerCase().includes(form.searchText.toLowerCase())
        )
      );
    }
  }, [form.searchText, prompts]);

  const showDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const locale = i18n.language === "es" ? "es-ES" : "en-US";
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };

  if (prompts.length === 0) return <NoPrompts />;

  return (
    <div className="text-left py-12 bg-white px-8 shadow rounded-xl mt-8">
      <div className="text-right mb-8 flex items-center justify-between">
        <Input
          className="w-1/3"
          type="text"
          placeholder={t("myPromptsContent.search")}
          {...formFields("searchText")}
        />
        <Button onClick={() => navigate("/create-prompt")}>
          {t("myPromptsContent.button")}
        </Button>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              {t("myPromptsContent.name")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("myPromptsContent.date")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("myPromptsContent.sales")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("myPromptsContent.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPrompts.map((prompt) => (
            <tr className="bg-white border-b ">
              <td className="p-6">{prompt.title}</td>
              <td className="p-6">{showDate(prompt.createdAt)}</td>
              <td className="p-6">{showDate(prompt.createdAt)}</td>
              <td className="p-6">
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
              </td>
            </tr>

            // <div className="flex gap-2">
            //   <MdEdit
            //     className="w-6 h-6 text-gray-600 cursor-pointer"
            //     onClick={() => console.log("EDIT PROMPT", prompt._id)}
            //   />
            //   <MdDelete
            //     className="w-6 h-6 text-rose-600 cursor-pointer"
            //     onClick={() => console.log("DELETE PROMPT", prompt._id)}
            //   />
            // </div>
          ))}
        </tbody>
      </table>
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
