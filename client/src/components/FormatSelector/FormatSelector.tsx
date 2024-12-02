// FormatSelector.tsx
import React from "react";
import Image from "next/image"; // Make sure to import Image from 'next/image'
import styles from "./FormatSelector.module.css"; // Import your CSS module

interface FormatSelectorProps {
  selectedOrientation: string; // Currently selected orientation
  onOrientationChange: (orientation: string) => void; // Callback for when orientation changes
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedOrientation,
  onOrientationChange,
}) => {
  return (
    <div className={styles.page}>
      <div className={styles.orientationContainer}>
        <h3 className={styles.h3}>Select Page Orientation:</h3>
        <div className={styles.orientationOptions}>
          <div className={styles.orientationOption}>
            <label htmlFor="landscape" className={styles.imageLabel}>
              <input
                type="radio"
                id="landscape"
                name="orientation"
                value="landscape"
                checked={selectedOrientation === "landscape"}
                onChange={() => onOrientationChange("landscape")}
                className={styles.radioInput}
              />
              <span className={styles.orientationText}>Landscape</span>
              <Image
                src="/icons/landscape.png"
                alt="Landscape Icon"
                width={40}
                height={40}
                className={styles.icon}
              />
            </label>
          </div>
          <div className={styles.orientationOption}>
            <label htmlFor="portrait" className={styles.imageLabel}>
              <input
                type="radio"
                id="portrait"
                name="orientation"
                value="portrait"
                checked={selectedOrientation === "portrait"}
                onChange={() => onOrientationChange("portrait")}
                className={styles.radioInput}
              />
              <span className={styles.orientationText}>Portrait</span>
              <Image
                src="/icons/portrait.png"
                alt="Portrait Icon"
                width={40}
                height={40}
                className={styles.portraitIcon}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatSelector;
