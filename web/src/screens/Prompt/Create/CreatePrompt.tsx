import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { Sidebar } from "./Sidebar";
import { BasicInfo } from "./BasicInfo";
import { PromptInfo } from "./PromptInfo";
import { Price } from "./Price";

export const CreatePrompt = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [errorCategory, setErrorCategory] = useState<string | undefined>();
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [errorPlatform, setErrorPlatform] = useState<string | undefined>();
  const [validSteps, setValidSteps] = useState<number[]>([]);
  const { form, formFields, setErrors } = useForm({
    title: "",
    description: "",
    whoIsFor: "",
    howToUse: "",
    prompt: "",
    price: 0,
  });

  const validate: Record<number, () => boolean> = {
    0: () => {
      let result = true;
      const errors: Record<string, string | undefined> = {};
      if (!form.title) {
        errors.title = t("errors.required");
        result = false;
      }

      if (!form.description) {
        errors.description = t("errors.required");
        result = false;
      }

      if (!form.whoIsFor) {
        errors.whoIsFor = t("errors.required");
        result = false;
      }

      if (!form.howToUse) {
        errors.howToUse = t("errors.required");
        result = false;
      }

      result
        ? setValidSteps([...validSteps, step])
        : setValidSteps(
            validSteps.filter((currentStep) => currentStep !== step)
          );

      setErrors(errors);
      return result;
    },
    1: () => {
      let result = true;
      let errorPlatform = undefined;
      let errorCategory = undefined;
      const errors: Record<string, string | undefined> = {};

      if (!selectedCategory.length) {
        errorCategory = t("errors.required");
        result = false;
      }

      if (!selectedPlatform?.length) {
        errorPlatform = t("errors.required");
        result = false;
      }

      if (!form.prompt) {
        errors.prompt = t("errors.required");
        result = false;
      }

      if (errorCategory) setErrorCategory(errorCategory);
      if (errorPlatform) setErrorPlatform(errorPlatform);

      result
        ? setValidSteps([...validSteps, step])
        : setValidSteps(
            validSteps.filter((currentStep) => currentStep !== step)
          );

      setErrors(errors);
      return result;
    },
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return <BasicInfo form={form} formFields={formFields} />;
      case 1:
        return (
          <PromptInfo
            form={form}
            formFields={formFields}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setErrorCategory={setErrorCategory}
            errorCategory={errorCategory}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            errorPlatform={errorPlatform}
            setErrorPlatform={setErrorPlatform}
          />
        );
      case 2:
        return <Price form={form} formFields={formFields} />;
      case 3:
        return <div>Step 3</div>;
      default:
        return <div>Step 0</div>;
    }
  };

  const handleNext = () => {
    if (!validate[step]()) return;
    console.log("FORM", form, selectedCategory, selectedPlatform);

    setStep(step + 1);
  };

  return (
    <div className="bg-white h-full p-8 shadow-lg rounded-xl">
      <div className="flex">
        <Sidebar step={step} setStep={setStep} validSteps={validSteps} />
        {renderContent()}
      </div>
      <hr className="my-7" />
      <div className="flex justify-end gap-4">
        <Button outline>{t("general.cancel")}</Button>
        <Button onClick={() => handleNext()}>{t("general.save")}</Button>
      </div>
    </div>
  );
};
