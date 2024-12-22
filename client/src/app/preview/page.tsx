"use client";

import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import PdfPreviewer from "@/components/PdfPreviewer/PdfPreviewer";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import BackButton from "@/components/BackButton/BackButton";
import PreviewButton from "@/components/PreviewButton/PreviewButton";


import styles from "./page.module.css";


const PreviewPage: React.FC = () => {
  const [fileId, setFileId] = useState<number>(8); // This could be dynamic depending on which file to preview

  // Function to handle preview button click
  const handlePreview = () => {
    alert("Implement Confirm Download Button"); 
  };
  return (
    <div className={styles.page}>
      <HeaderBar />
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <BackButton />
          <div className={styles.h2}>Confirm format</div>
        </div>
        <div className={styles.headerRight}>
          <PreviewButton onPreview={handlePreview} />
        </div>
      </div>
      <div className={styles.main}>
        <Box>
          <Paper sx={{ padding: "20px", maxWidth: "1500px", margin: "auto" }}>
            {/* Show the PDF preview component */}
            <PdfPreviewer fileId={fileId} />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default PreviewPage;
