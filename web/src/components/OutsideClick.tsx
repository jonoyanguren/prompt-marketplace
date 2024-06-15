import React, { useEffect, useRef } from "react";

export const OutsideClick = ({
  children,
  onOutsideClick,
}: {
  children: React.ReactNode;
  onOutsideClick: () => void;
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    document.body.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};
