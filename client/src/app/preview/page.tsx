"use client";

import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import PdfPreviewer from "@/components/PdfPreviewer/PdfPreviewer";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import BackButton from "@/components/BackButton/BackButton";
import DownloadButton from "@/components/DownloadButton/DownloadButton";

import styles from "./page.module.css";


const PreviewPage: React.FC = () => {
  const [fileId, setFileId] = useState<number>(8); // This could be dynamic depending on which file to preview

  const handleDownload = () => {
    alert("Downloading the file...");
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
          <DownloadButton onClick={handleDownload} />
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
