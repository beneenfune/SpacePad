import { pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { CircularProgress, Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Document, Page } from "react-pdf";
import styles from "./PdfPreviewer.module.css"; // Import the CSS module

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
  const [pdfData, setPdfData] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numPages, setNumPages] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const fetchPDF = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/get-processed-pdf/${fileId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }

        const blob = await response.blob();
        setPdfData(blob);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPDF();
  }, [fileId]);

  const onLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3.0));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
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
      <div className={styles.page}>
        <Box className={styles.pdfContainer}>
          <div className={styles.scrollablePDF}>
            <Box className={styles.zoomControls}>
              <IconButton onClick={handleZoomOut} aria-label="zoom out">
                <Remove />
              </IconButton>
              <div className={styles.zoomLabel}>
                {Math.round(zoom * 100)}%
              </div>
              <IconButton onClick={handleZoomIn} aria-label="zoom in">
                <Add />
              </IconButton>
            </Box>
            {pdfData ? (
              <Document file={pdfData} onLoadSuccess={onLoadSuccess}>
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={index}
                    pageNumber={index + 1}
                    scale={zoom}
                    renderTextLayer={false} // Disable rendering of text layer
                    renderAnnotationLayer={false} // Keeps annotation layer (e.g., links)
                  />
                ))}
              </Document>
            ) : (
              <p>No PDF content available</p>
            )}
          </div>
        </Box>
      </div>
    );
};

export default PdfPreviewer;
