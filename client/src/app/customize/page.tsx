"use client"; 

import { useSearchParams, useRouter } from "next/navigation"; 
import FormatSelector from "@/components/FormatSelector/FormatSelector";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import RestartButton from "@/components/RestartButton/RestartButton";
import styles from "./page.module.css";
import PreviewButton from "@/components/PreviewButton/PreviewButton";
import BackButton from "@/components/BackButton/BackButton";
import BaseTemplatePage from "@/components/BaseTemplatePage/BaseTemplatePage";



const CustomizePage = () => {
  const searchParams = useSearchParams(); 
  const router = useRouter();
  const orientation = searchParams.get("orientation") || "portrait"; 
  const fileId = searchParams.get("fileId"); 

  const handleOrientationChange = (newOrientation: string) => {
    router.push(`/customize?orientation=${newOrientation}&fileId=${fileId}`);
  };

  const handleRestartCustomization = () => {
    // Logic to restart customization (e.g., resetting state or navigating to initial state)
    alert("Customization restarted!"); // Placeholder for restart logic
  };

  // Function to handle preview button click
  const handlePreview = () => {
    alert("Previewing..."); 
  };

  return (
    <div className={styles.page}>
      <HeaderBar />
      <div className={styles.headerContainer}>
        <BackButton />
        <h2 className={styles.h2}> Customize template</h2>
      </div>
      <div className={styles.main}>
        {orientation === "landscape" ? (
          <BaseTemplatePage orientation="landscape" />
        ) : (
          <BaseTemplatePage orientation="portrait" />
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
