import React, { useState } from "react";
import i18n from "../../i18n";

const faq = {
  en: [
    {
      id: 1,
      title: "What is PromptMarketplace Creators?",
      content: `Prompt Marketplace Creators is a program for creative people to share their work with hundreds of millions of people and earn passive income.`,
    },
    {
      id: 2,
      title: "What can I sell as a Creator?",
      content: `All PromptMarketplace Creators can upload prompts in their profile. You will need to complete the prompt form and set a selling price.`,
    },
    {
      id: 3,
      title: "How do I become a Creator?",
      content: `Anyone can become a Creator from their personal profile.`,
    },
    {
      id: 4,
      title: "Is there a review process for Creators' content?",
      content: `Yes. All submissions undergo a review process. To pass review, all the prompts must meet our standard requirements.`,
    },
  ],
  es: [
    {
      id: 1,
      title: "¿Qué es PromptMarketplace Creators?",
      content: `Prompt Marketplace Creators es un programa para que personas creativas compartan su trabajo con cientos de millones de personas y ganen ingresos pasivos.`,
    },
    {
      id: 2,
      title: "¿Qué puedo vender como Creador?",
      content: `Todos los Creadores de PromptMarketplace pueden subir prompts en su perfil. Necesitarás completar el formulario de prompt y establecer un precio de venta.`,
    },
    {
      id: 3,
      title: "¿Cómo me convierto en Creador?",
      content: `Cualquiera puede convertirse en Creador desde su perfil personal.`,
    },
    {
      id: 4,
      title: "¿Hay un proceso de revisión para el contenido de los Creadores?",
      content: `Sí. Todas las presentaciones pasan por un proceso de revisión. Para ser aprobados, todos los prompts deben cumplir con nuestros requisitos estándar.`,
    },
  ],
};

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
            <h2 id={`accordion-flush-heading-${id}`} className="text-left">
              <button
                type="button"
                className="flex text-left items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
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
