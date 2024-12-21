"use client"; // Ensure this is marked as a client component
import { useSearchParams, useRouter } from "next/navigation"; 
import LandscapeOrientation from "@/components/LandscapeOrientation";
import PortraitOrientation from "@/components/PortraitOrientation";
import FormatSelector from "@/components/FormatSelector/FormatSelector";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import RestartButton from "@/components/RestartButton/RestartButton";
import styles from "./page.module.css";
import PreviewButton from "@/components/PreviewButton/PreviewButton";
import BackButton from "@/components/BackButton/BackButton";


const CustomizePage = () => {
  const searchParams = useSearchParams(); // Get search params
  const router = useRouter(); // Get router instance
  const orientation = searchParams.get("orientation") || "portrait"; // Default to portrait if not set

  // Function to handle orientation change
  const handleOrientationChange = (newOrientation: string) => {
    router.push(`/customize?orientation=${newOrientation}`); // Update the URL with the new orientation
  };

  // Function to handle restart customization
  const handleRestartCustomization = () => {
    // Logic to restart customization (e.g., resetting state or navigating to initial state)
    alert("Customization restarted!"); // Placeholder for restart logic
  };

  // Function to handle preview button click
  const handlePreview = () => {
    alert("Previewing..."); // Action to perform on preview
  };

  return (
    <div className={styles.page}>
      <HeaderBar />
      <div className={styles.headerContainer}>
        <BackButton />
        <h2 className={styles.h2}> Customize </h2>
      </div>
      <div className={styles.main}>
        {orientation === "landscape" ? (
          <LandscapeOrientation />
        ) : (
          <PortraitOrientation />
        )}
        <div>
          <FormatSelector
            selectedOrientation={orientation}
            onOrientationChange={handleOrientationChange} // Pass the handler
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <RestartButton onRestart={handleRestartCustomization} />
        <PreviewButton onPreview={handlePreview} />
      </div>
    </div>
  );
};

export default CustomizePage;
