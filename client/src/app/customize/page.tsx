"use client"

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import RestartButton from "@/components/RestartButton/RestartButton";
import styles from "./page.module.css";
import PreviewButton from "@/components/PreviewButton/PreviewButton";
import BackButton from "@/components/BackButton/BackButton";
import FirstPage from "@/components/FirstPage/FirstPage";
import BaseTemplatePage from "@/components/BaseTemplatePage/BaseTemplatePage";
import FormatSelector from "@/components/FormatSelector/FormatSelector";

const CustomizePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orientation = searchParams.get("orientation") || "portrait";
  const fileId = searchParams.get("fileId");

  const [processing, setProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");

  // New state for position and size
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleOrientationChange = (newOrientation: string) => {
    router.push(`/customize?orientation=${newOrientation}&fileId=${fileId}`);
  };

  const handleRestartCustomization = () => {
    // Logic to restart customization (e.g., resetting state or navigating to initial state)
    alert("Customization restarted!"); // Placeholder for restart logic
  };

  // Function to handle preview button click
  const handlePreview = async () => {
    if (!fileId) {
      console.error("File ID is missing!");
      return;
    }

    setProcessing(true); // Show the dialog
    setProcessingMessage("Processing your PDF..."); // Update the dialog message

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/process-custom-pdf?` +
          new URLSearchParams({
            fileId,
            x: imagePosition.x.toString(),
            y: imagePosition.y.toString(),
            width: imageSize.width.toString(),
            height: imageSize.height.toString(),
            orientation: orientation,
          }),
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to process PDF: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.fileId) {
        console.log(
          `PDF processed successfully with File ID: ${result.fileId}`
        );
        setProcessingMessage("Redirecting to preview...");
        setTimeout(
          () => {
            setProcessing(false); // Hide dialog
            router.push(`/preview?fileId=${result.fileId}`);
          },
          1000 // Optional delay for user feedback
        );
      } else {
        setProcessingMessage("Failed to process the PDF. Please try again.");
        throw new Error("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Failed to process the PDF:", error);
    } finally {
      setTimeout(() => setProcessing(false), 1500); // Hide dialog after a delay
    }
  };

  return (
    <div className={styles.page}>
      <HeaderBar />
      <div className={styles.headerContainer}>
        <BackButton />
        <h2 className={styles.h2}> Customize template</h2>
      </div>
      <div className={styles.main}>
        <BaseTemplatePage orientation={orientation as "portrait" | "landscape"}>
          <FirstPage
            pageSize={{ width: 595, height: 842 }}
            setImagePosition={setImagePosition}
            setImageSize={setImageSize}
          />
        </BaseTemplatePage>
        <div className={styles.controls}>
          <FormatSelector
            selectedOrientation={orientation}
            onOrientationChange={handleOrientationChange}
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
