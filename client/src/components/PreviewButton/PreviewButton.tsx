// PreviewButton.tsx
import React from "react";
import styles from "./PreviewButton.module.css"; // Import CSS module for styling

interface PreviewButtonProps {
  onPreview: () => void; // Callback to handle preview action
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ onPreview }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={styles.previewButton}
        onClick={onPreview}
      >
        Preview
      </button>
    </div>
  );
};

export default PreviewButton;
