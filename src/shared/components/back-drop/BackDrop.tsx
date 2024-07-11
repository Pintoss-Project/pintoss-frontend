import * as s from "./BackDropStyle.css";

import { ReactNode } from "react";

interface BackDropProps {
  children: ReactNode;
  onClose?: () => void;
}

const BackDrop = ({ children, onClose }: BackDropProps) => {
  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <div className={s.backdropWrap} onClick={handleBackDropClick}>
      {children}
    </div>
  );
};

export default BackDrop;
