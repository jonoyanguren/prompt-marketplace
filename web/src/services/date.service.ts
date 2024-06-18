import i18n from "../i18n";

export const showDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const locale = i18n.language === "es" ? "es-ES" : "en-US";
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};
