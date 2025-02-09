"use client"; 

import { useSearchParams, useRouter } from "next/navigation";
import { Document, Page } from "react-pdf";
import React, { useEffect, useState } from "react";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import RestartButton from "@/components/RestartButton/RestartButton";
import styles from "./page.module.css";
import PreviewButton from "@/components/PreviewButton/PreviewButton";
import BackButton from "@/components/BackButton/BackButton";
import BaseTemplatePage from "@/components/BaseTemplatePage/BaseTemplatePage";
import FormatSelector from "@/components/FormatSelector/FormatSelector";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CustomizePage = () => {
  const searchParams = useSearchParams(); 
  const router = useRouter();
  const orientation = searchParams.get("orientation") || "portrait"; 
  const fileId = searchParams.get("fileId"); 
  
  const [pdfData, setPdfData] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    const fetchFirstPage = async () => {
      if (fileId) {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/files/get-pdf/${fileId}/first-page`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
          }

          const blob = await response.blob();
          console.log(blob)
          setPdfData(blob);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFirstPage();
  }, [fileId]);


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
          <BaseTemplatePage orientation="landscape">
            {loading ? (
              <p>Loading PDF...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <Document file={pdfData}>
                <Page
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            )}
          </BaseTemplatePage>
        ) : (
          <BaseTemplatePage orientation="portrait">
            {loading ? (
              <p>Loading PDF...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <Document file={pdfData}>
                <Page
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            )}
          </BaseTemplatePage>
        )}
        <div>
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
