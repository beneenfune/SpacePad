// ContinueButton.tsx
import React from "react";
import styles from "./ContinueButton.module.css"; // Import CSS module for styling

interface ContinueButtonProps {
  onContinue: () => void; // Callback to handle preview action
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onContinue }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={styles.previewButton}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default ContinueButton;
