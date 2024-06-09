import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <>
      <div
        className="w-full h-full bg-gray-500 absolute top-0 left-0 z-10 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-xl p-6 absolute top-36 w-1/3 left-1/3 z-20 min-w-[600px]">
        <button className="w-full text-right" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </>
  );
};
