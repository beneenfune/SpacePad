// components/ConfirmDownloadButton/ConfirmDownloadButton.tsx
import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<DownloadIcon />}
      onClick={onClick}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontFamily: "var(--font-geist-mono)", // Custom font
        fontSize: "20px",
        "&:hover": {
          backgroundColor: "darkgreen",
        },
      }}
    >
      Download
    </Button>
  );
};

export default DownloadButton;
