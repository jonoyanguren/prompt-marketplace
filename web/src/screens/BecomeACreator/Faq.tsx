import React, { useState } from "react";
import { faq } from "./faq";
import i18n from "../../i18n";

export const Faq = () => {
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const translatedFaq = faq[i18n.language as keyof typeof faq] || faq.es;

  const togglePanel = (panelNumber: number) => {
    if (openPanel === panelNumber) {
      setOpenPanel(null);
    } else {
      setOpenPanel(panelNumber);
    }
  };

  return (
    <div id="accordion-flush">
      {translatedFaq.map(
        ({
          id,
          title,
          content,
        }: {
          id: number;
          title: string;
          content: string;
        }) => (
          <React.Fragment key={id}>
            <h2 id={`accordion-flush-heading-${id}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                onClick={() => togglePanel(id)}
                aria-expanded={openPanel === id}
                aria-controls={`accordion-flush-body-${id}`}
              >
                <span className="text-2xl text-gray-900">{title}</span>
                <svg
                  className={`w-3 h-3 shrink-0 ${
                    openPanel === id ? "" : "rotate-180"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            {openPanel === id && (
              <div
                id={`accordion-flush-body-${id}`}
                className="py-5 border-b border-gray-200 dark:border-gray-700 text-gray-500"
                aria-labelledby={`accordion-flush-heading-${id}`}
              >
                {content}
              </div>
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};
