import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface ProcessingDialogProps {
  open: boolean;
  message: string;
}

const ProcessingDialog: React.FC<ProcessingDialogProps> = ({
  open,
  message,
}) => {
  return (
    <Dialog open={open} aria-labelledby="processing-dialog" maxWidth="xs">
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress size={50} color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingDialog;
