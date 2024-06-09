import { FaLongArrowAltRight } from "react-icons/fa";

export const Sidebar = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const menuItems = ["Basic Info", "Prompt Info", "Price", "Preview & Publish"];

  return (
    <div className="w-1/4 p-4">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`mb-4 border rounded-md p-2 ${
              step === index
                ? "border-indigo-300 bg-indigo-50 flex justify-between items-center"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <button
              className={`w-full text-left p-2`}
              onClick={() => setStep(index)}
            >
              <p
                className={`font-semibold ${
                  step === index ? "text-indigo-700" : "text-gray-700"
                }`}
              >
                {index + 1}. {item}
              </p>
            </button>
            {step === index && (
              <FaLongArrowAltRight className="text-indigo-500 mr-2" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
