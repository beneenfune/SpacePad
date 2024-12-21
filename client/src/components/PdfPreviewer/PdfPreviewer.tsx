import { pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { CircularProgress, Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Document, Page } from "react-pdf";
import styles from "./PdfPreviewer.module.css"; // Import the CSS module

// Set up the worker source for pdfjs
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

type PdfPreviewerProps = {
  fileId: number;
};

const PdfPreviewer: React.FC<PdfPreviewerProps> = ({ fileId }) => {
  const [pdfData, setPdfData] = useState<Blob | null>(null); // Store the PDF Blob data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numPages, setNumPages] = useState<number>(0); // Total number of pages in the PDF
  const [zoom, setZoom] = useState<number>(1); // State for zoom level

  useEffect(() => {
    const fetchPDF = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/get-pdf/${fileId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }

        // Convert response to Blob (binary large object)
        const blob = await response.blob();
        setPdfData(blob); // Set the pdf Blob data here
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPDF();
  }, [fileId]);

  const onLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages); // Update the number of pages once the PDF is loaded
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3.0)); // Increase zoom (max 3x)
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Decrease zoom (min 0.5x)
  };

  if (loading) {
    return (
      <div className={styles.loadingSpinner}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p className={styles.errorText}>{error}</p>;
  }

  return (
    <Box className={styles.pdfContainer}>
      {/* PDF component with a light gray background */}
      <div className={styles.scrollablePDF}>
        {/* Zoom control */}
        <Box className={styles.zoomControls}>
          <IconButton onClick={handleZoomOut} aria-label="zoom out">
            <Remove />
          </IconButton>
          <Typography variant="h6" className={styles.zoomLabel}>
            {Math.round(zoom * 100)}%
          </Typography>
          <IconButton onClick={handleZoomIn} aria-label="zoom in">
            <Add />
          </IconButton>
        </Box>

        {/* Display PDF if pdfData exists */}
        {pdfData ? (
          <Document
            file={pdfData}
            onLoadSuccess={onLoadSuccess} // Get the number of pages on load
          >
            {/* Render all pages in the document */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                scale={zoom} // Apply zoom level
              />
            ))}
          </Document>
        ) : (
          <p>No PDF content available</p>
        )}
      </div>
    </Box>
  );
};

export default PdfPreviewer;
