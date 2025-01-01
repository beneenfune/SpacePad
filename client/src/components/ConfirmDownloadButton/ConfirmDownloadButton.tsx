// components/ConfirmDownloadButton/ConfirmDownloadButton.tsx
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import downloadjs from "downloadjs";

interface ConfirmDownloadButtonProps {
  fileId: number;
}

const ConfirmDownloadButton: React.FC<ConfirmDownloadButtonProps> = ({
  fileId,
}) => {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/files/download/${fileId}`,
        {
          responseType: "blob",
          method: "GET",
          onDownloadProgress: (progressEvent) => {
            console.log(
              "Download progress: " +
                Math.round(
                  (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
                ) +
                "%"
            );
          },
        }
      );
      const data = response.data as Blob;
      downloadjs(data, `${fileId}.pdf`);
      console.log("Downloaded");
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    } finally {
      setIsDownloading(false);
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<DownloadIcon />}
        onClick={handleClickOpen}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
        }}
      >
        Confirm Download
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Download</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to download the file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDownload}
            color="success"
            disabled={isDownloading}
          >
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDownloadButton;
