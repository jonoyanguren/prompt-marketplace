import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar";
import { Button, Input } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { CategoriesFilter } from "../../../components/Home/CategoriesFilter";
import { useState } from "react";
import { BasicInfo } from "./BasicInfo";

export const CreatePrompt = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const { form, formFields } = useForm({
    title: "",
    description: "",
    whoIsFor: "",
  });

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <BasicInfo
            form={form}
            formFields={formFields}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 1:
        return <div>Step 1</div>;
      case 2:
        return <div>Step 2</div>;
      case 3:
        return <div>Step 3</div>;
      default:
        return <div>Step 0</div>;
    }
  };

  return (
    <div className="bg-white h-full p-8 shadow-lg rounded-xl">
      <div className="flex">
        <Sidebar step={step} setStep={setStep} />
        {renderContent()}
      </div>
      <hr className="my-7" />
      <div className="flex justify-end gap-4">
        <Button outline>Discard</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};
