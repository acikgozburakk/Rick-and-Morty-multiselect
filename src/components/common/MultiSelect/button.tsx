import React from "react";

import styles from "./styles.module.css";

interface MultiSelectButtonProps {
  name: string;
  handleDeleteButton: () => void;
}

const MultiSelectButton: React.FC<MultiSelectButtonProps> = ({
  name,
  handleDeleteButton,
}) => {
  return (
    <div className={styles.buttonWrapper}>
      <span className={styles.nameClass}>{name}</span>
      <button onClick={handleDeleteButton} className={styles.buttonCloseButton}>
        X
      </button>
    </div>
  );
};

export default MultiSelectButton;
