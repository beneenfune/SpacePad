"use client";

import { useState } from "react";
import axios from "axios";
import downloadjs from "downloadjs";


import { Box, Paper} from "@mui/material";
import PdfPreviewer from "@/components/PdfPreviewer/PdfPreviewer";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import BackButton from "@/components/BackButton/BackButton";
import DownloadButton from "@/components/DownloadButton/DownloadButton";
import ConfirmDownloadButton from "@/components/ConfirmDownloadButton/ConfirmDownloadButton";

import styles from "./page.module.css";


const PreviewPage: React.FC = () => {
  const [fileId, setFileId] = useState<number>(8); // This could be dynamic depending on which file to preview

// const handleDownload = async () => {
//     try {
//       const fileId = 8; // Example file ID
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/files/download/${fileId}`,
//         {
//           responseType: "blob",
//           onDownloadProgress: (progressEvent) => {
//             console.log(
//               "Download progress: " +
//                 Math.round(
//                   (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
//                 ) +
//                 "%"
//             );
//           },
//         }
//       );

//       const data = response.data as Blob;
//       downloadjs(data, `${fileId}.pdf`);
//       console.log("Downloaded");
//     } catch (error) {
//       console.error("Error downloading file:", error);
//       alert("Failed to download file.");
//     }
//   };
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
