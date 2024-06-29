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
      <div className="bg-white rounded-xl top-24 w-1/3 left-1/3 z-20 min-w-[600px] fixed h-2/3 overflow-y-scroll">
        <div className="relative">
          <button
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            {t("general.close")}
          </button>
        </div>
        <div className="p-6 overflow-y-scroll h-full">{children}</div>
      </div>
    </>
  );
};
