"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Paper } from "@mui/material";
import PdfPreviewer from "@/components/PdfPreviewer/PdfPreviewer";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import BackButton from "@/components/BackButton/BackButton";
import ConfirmDownloadButton from "@/components/ConfirmDownloadButton/ConfirmDownloadButton";

import styles from "./page.module.css";

const PreviewPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [fileId, setFileId] = useState<number | null>(null);
  
  useEffect(() => {
    const fileIdFromURL = searchParams.get("fileId");
    if (fileIdFromURL) {
      setFileId(parseInt(fileIdFromURL, 10));
    } else {
      console.error("File ID is missing in the URL!");
    }
  }, [searchParams]);

  if (!fileId) {
    return <div>Loading...</div>; // Or handle the missing fileId case more elegantly
  }

  return (
    <div className={styles.page}>
      <HeaderBar />
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <BackButton />
          <div className={styles.h2}>Confirm format</div>
        </div>
        <div className={styles.headerRight}>
          <ConfirmDownloadButton fileId={fileId} />
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
