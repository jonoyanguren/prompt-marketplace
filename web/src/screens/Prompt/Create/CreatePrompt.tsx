import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { Sidebar } from "./Sidebar";
import { BasicInfo } from "./BasicInfo";
import { PromptInfo } from "./PromptInfo";
import { Price } from "./Price";
import { PreviewAndPublish } from "./PreviewAndPublish";
import { AuthContext } from "../../../contexts/AuthContext";
import { createPrompt } from "../../../api/prompt";
import { useNavigate } from "react-router-dom";

export const CreatePrompt = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [errorCategory, setErrorCategory] = useState<string | undefined>();
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [errorPlatform, setErrorPlatform] = useState<string | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [validSteps, setValidSteps] = useState<number[]>([]);

  const { user } = useContext(AuthContext);

  const { form, formFields, setErrors } = useForm({
    title: "Hola",
    description: "Este es un prompt de prueba",
    whoIsFor: "hola",
    howToUse: "hola",
    prompt: "El prompt en si",
    price: 3,
    createdBy: user?._id,
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
    2: () => {
      const result = true;
      setValidSteps([...validSteps, step]);
      return result;
    },
    3: () => {
      const result = true;
      setValidSteps([...validSteps, step]);
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
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        );
      case 2:
        return <Price form={form} formFields={formFields} />;
      case 3:
        return (
          <PreviewAndPublish
            form={form}
            selectedCategories={selectedCategory}
            selectedPlatforms={selectedPlatform}
          />
        );
      default:
        return <BasicInfo form={form} formFields={formFields} />;
    }
  };

  const handleNext = () => {
    if (!validate[step]()) return;
    console.log("FORM", form, selectedCategory, selectedPlatform);

    setStep(step + 1);
  };

  const publish = async () => {
    try {
      const finalPrompt = {
        ...form,
        categories: selectedCategory,
        platforms: selectedPlatform,
        tags: selectedTags,
      };

      const res = await createPrompt({ prompt: finalPrompt });
      navigate("/create-prompt-success");
      console.log("RES", res);
    } catch (error) {
      console.error("Error publishing prompt", error);
    }
  };

  return (
    <div className="bg-white h-full p-8 shadow-lg rounded-xl">
      <div className="flex">
        <Sidebar step={step} setStep={setStep} validSteps={validSteps} />
        {renderContent()}
      </div>
      <hr className="my-7" />
      <div className="flex justify-end gap-4">
        {step === 3 ? (
          <Button onClick={() => publish()}>{t("general.publish")}</Button>
        ) : (
          <>
            <Button outline>{t("general.cancel")}</Button>
            <Button onClick={() => handleNext()}>{t("general.save")}</Button>
          </>
        )}
      </div>
    </div>
  );
};
