import { useTranslation } from "react-i18next";
import { Button, Title } from "../../components";
import hero from "../../assets/becomeACreator/hero.png";
import passiveIncome from "../../assets/becomeACreator/passiveIncome.jpg";
import continousImprovement from "../../assets/becomeACreator/continousImprovement.jpg";
import { Faq } from "./Faq";
import cta from "../../assets/becomeACreator/cta.png";
import { Benefits } from "./Benefits";
import { useRef } from "react";

export const BecomeACreator = () => {
  const { t } = useTranslation();
  const benefitList = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Hero */}
      <div className="flex justify-center items-center shadow-xl rounded-xl bg-white">
        <div
          className="w-1/2 h-[400px] bg-cover bg-center rounded-tl-xl rounded-bl-xl"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>
        <div className="text-center mx-8">
          <Title>{t("becomeACreator.title")}</Title>
          <p className="my-4">{t("becomeACreator.text")}</p>
          <Button
            onClick={() =>
              benefitList.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("becomeACreator.button")}
          </Button>
        </div>
      </div>

      {/* Our mission */}
      <div className="mt-12 text-left p-8 shadow-xl rounded-xl bg-white">
        <p className="font-bold mb-4 text-xl">
          {t("becomeACreator.ourMission")}
        </p>
        <p className="text-gray-500">{t("becomeACreator.ourMissionText")}</p>
      </div>

      {/* Benefits */}
      <div className="flex gap-6">
        <div className="mt-12 text-center flex flex-col justify-center p-8 shadow-xl rounded-xl bg-white ">
          <img src={passiveIncome} className="rounded-xl w-2/3 m-auto" alt="" />
          <p className="my-8 font-medium text-2xl text-gray-900">
            {t("becomeACreator.passiveIncome")}
          </p>
          <p className="text-gray-500">
            {t("becomeACreator.passiveIncomeText")}
          </p>
        </div>

        <div className="mt-12 text-center flex flex-col justify-center p-8 shadow-xl rounded-xl bg-white ">
          <img
            src={continousImprovement}
            className="rounded-xl w-2/3 m-auto"
            alt=""
          />
          <p className="my-8 font-medium text-2xl text-gray-900">
            {t("becomeACreator.reachAndVisibility")}
          </p>
          <p className="text-gray-500">
            {t("becomeACreator.reachAndVisibilityText")}
          </p>
        </div>

        <div className="mt-12 text-center flex flex-col justify-center p-8 shadow-xl rounded-xl bg-white ">
          <img src={passiveIncome} className="rounded-xl w-2/3 m-auto" alt="" />
          <p className="my-8 font-medium text-2xl text-gray-900">
            {t("becomeACreator.continousImprovement")}
          </p>
          <p className="text-gray-500">
            {t("becomeACreator.continousImprovementText")}
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12 bg-white text-left p-8 shadow-xl rounded-xl flex">
        <div className="w-1/3">
          <p className="font-bold mb-4 text-xl">{t("becomeACreator.faq")}</p>
          <p className="text-gray-500">{t("becomeACreator.faqText")}</p>
        </div>
        <div className="w-2/3">
          <Faq />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-left p-8 shadow-xl rounded-xl bg-indigo-500 text-gray-50 flex items-center justify-between">
        <div>
          <p className="my-2 text-3xl">{t("becomeACreator.ctaText")}</p>
          <p className="my-2 text-3xl">{t("becomeACreator.ctaText1")}</p>
        </div>
        <div>
          <img src={cta} className="rounded-xl" alt="" />
        </div>
      </div>

      {/* Benefit list */}
      <div ref={benefitList} className="mt-12 text-left p-8">
        <Benefits />
      </div>
    </>
  );
};
