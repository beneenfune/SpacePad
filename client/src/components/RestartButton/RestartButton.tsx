// RestartButton.tsx
import React from "react";
import { VscDebugRestart } from "react-icons/vsc";
import styles from "./RestartButton.module.css"; // Import CSS module for styling

interface RestartButtonProps {
  onRestart: () => void; // Callback to handle restart action
}

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => {
  const handleClick = () => {
    const confirmRestart = window.confirm(
      "Are you sure you want to restart customization? This will erase all changes."
    );

    if (confirmRestart) {
      onRestart();
    }
  };

  return (
    <div
      className={styles.restartButtonContainer}
      title="Restart customization" // Tooltip text on hover
      onClick={handleClick} // Handle click event
    >
      <div className={styles.restartButton}>
        <VscDebugRestart />
      </div>
    </div>
  );
};

export default RestartButton;
