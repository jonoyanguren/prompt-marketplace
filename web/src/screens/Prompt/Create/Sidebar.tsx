import { useTranslation } from "react-i18next";
import { FaLongArrowAltRight, FaCheck } from "react-icons/fa";

export const Sidebar = ({
  step,
  validSteps,
  setStep,
}: {
  step: number;
  validSteps: number[];
  setStep: (value: number) => void;
}) => {
  const { t } = useTranslation();
  const menuItems = [
    t("createPrompt.sidebarItems.info"),
    t("createPrompt.sidebarItems.prompt"),
    t("createPrompt.sidebarItems.price"),
    t("createPrompt.sidebarItems.previewAndPublish"),
  ];

  const getItemStyles = (index: number) => {
    if (validSteps && validSteps.length && validSteps.includes(index)) {
      return "border-green-300 bg-green-50 flex justify-between items-center";
    }
    if (step === index) {
      return "border-indigo-300 bg-indigo-50 flex justify-between items-center";
    } else {
      return "border-gray-300 bg-gray-50";
    }
  };

  const getTextStyles = (index: number) => {
    if (validSteps && validSteps.length && validSteps.includes(index)) {
      return "text-green-500";
    }
    if (step === index) {
      return "text-indigo-500";
    } else {
      return "text-gray-500";
    }
  };

  const getItemIcon = (index: number) => {
    if (validSteps && validSteps.length && validSteps.includes(index)) {
      return <FaCheck className="text-green-500 mr-2" />;
    }
    if (step === index) {
      return <FaLongArrowAltRight className="text-indigo-500 mr-2" />;
    } else {
      return null;
    }
  };

  return (
    <div className="w-1/4 p-4">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`mb-4 border rounded-md p-2 ${getItemStyles(index)}`}
          >
            <button
              className={`w-full text-left p-2`}
              onClick={() => setStep(index)}
            >
              <p className={`font-semibold ${getTextStyles(index)}`}>
                {index + 1}. {item}
              </p>
            </button>
            {getItemIcon(index)}
          </li>
        ))}
      </ul>
    </div>
  );
};
