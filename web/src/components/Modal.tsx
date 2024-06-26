import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <>
      <div
        className="w-full h-full bg-gray-500 top-0 left-0 z-10 opacity-50 fixed"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-xl p-6 top-36 w-1/3 left-1/3 z-20 min-w-[600px] fixed">
        <button className="w-full text-right" onClick={onClose}>
          {t("general.close")}
        </button>
        {children}
      </div>
    </>
  );
};
