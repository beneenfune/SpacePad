import React from "react";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css"; // Ensure you have a CSS module for styling
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the back arrow icon

const BackButton = () => {
  const router = useRouter(); // Get router instance

  // Function to handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <button className={styles.backButton} onClick={handleBack}>
      <IoMdArrowRoundBack className={styles.icon} />{" "}
      {/* Use the imported icon */}
    </button>
  );
};

export default BackButton;
