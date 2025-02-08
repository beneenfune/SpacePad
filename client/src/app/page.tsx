"use client"; 

import Image from "next/image";
import { Typography, Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { FaRocket } from "react-icons/fa";
import UploadButton from "@/components/UploadButton/UploadButton";
import DeleteFileButton from "@/components/DeleteFileButton/DeleteFileButton";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import TuneIcon from "@mui/icons-material/Tune";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Home() {
    const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<number | null>(null); // To store file ID from server after upload
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File | null) => {
    setUploadedFile(file);
    setIsUploading(true);

    if (file) {
      console.log("Uploaded file:", file.name);

      // Create form data for upload
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
          {
            method: "POST",
            body: formData, // Upload file to backend
          }
        );

        const result = await response.json();

        if (result.success) {
          console.log("File uploaded successfully:", result.data);
          setFileId(result.data.fileId); // Assume the API returns a `fileId` for the uploaded file

          // Redirect to /format after successful upload
          router.push(`/format?fileId=${result.data.fileId}`);
        } else {
          console.error("Failed to upload file:", result.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setTimeout(() => setIsUploading(false), 1500); // Hide dialog after a delay
      }
    }
  };

  const handleFileDeleteSuccess = () => {
    // Clear the uploaded file and fileId after deletion
    setUploadedFile(null);
    setFileId(null);
  };
  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          SpacePad <FaRocket className={styles.rocketIcon} />
        </header>
        <div className={styles.h2}>
          Create Space around your lecture notes for easy note-taking on your
          Pad devices.
        </div>
        {/* <div className={styles.body}>
          Upload your PDF or PPT lecture slides and customize them with extra
          space for note-taking. With SpacePad, you can choose the placement and
          size of each lecture page, adjusting the orientation to landscape or
          portrait to fit your note-taking preference.
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/spacepad-demo-photo.png"
            alt="SpacePad Demo"
            layout="intrinsic"
            width={900}
            height={500}
          />
        </div>

        {/* Features Section */}
        <Box sx={{ padding: "10px 20px", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontFamily: "inherit",
              color: "#2c3e50",
            }}
          >
            Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            <Feature
              icon={<ViewQuiltIcon sx={{ fontSize: 60, color: "#6495ed" }} />}
              title="Predefined Templates"
              description="Select from predefined landscape or portrait templates to effortlessly organize your lecture slides."
            />
            <Feature
              icon={<TuneIcon sx={{ fontSize: 60, color: "#6495ed" }} />}
              title="Customization Tool"
              description="Drag, resize, or realign your lecture notes effortlessly. Place your content exactly where you need it."
            />
            <Feature
              icon={<TextSnippetIcon sx={{ fontSize: 60, color: "#6495ed" }} />}
              title="Retained PDF Text"
              description="Processed PDFs retain their original text for text search functionality."
            />
            <Feature
              icon={<CloudUploadIcon sx={{ fontSize: 60, color: "#6495ed" }} />}
              title="Ease of Use"
              description="Easily upload and download your files with our streamlined interface."
            />
          </Box>
        </Box>

        {/* Steps to Get Started */}
        <Box sx={{ padding: "10px", textAlign: "center", marginTop: "20px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontFamily: "inherit",
              color: "#2c3e50",
            }}
          >
            Steps to Get Started
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {/* Steps */}
            {[
              {
                icon: (
                  <CloudUploadIcon sx={{ fontSize: 50, color: "#ff8c00" }} />
                ),
                title: "1. Upload Your File",
              },
              {
                icon: <TuneIcon sx={{ fontSize: 50, color: "#ff8c00" }} />,
                title: "2. Customize Spacing",
              },
              {
                icon: (
                  <TextSnippetIcon sx={{ fontSize: 50, color: "#ff8c00" }} />
                ),
                title: "3. Download Your File",
              },
            ].map((step, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  maxWidth: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                {step.icon}
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "10px",
                    fontSize: "1.2rem",
                    fontFamily: "inherit",
                    color: "#2c3e50",
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "10px",
                    fontSize: "0.95rem",
                    color: "#777",
                    fontFamily: "inherit",
                  }}
                ></Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <div className={styles.ctas}>
          {isUploading ? (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <CircularProgress color="success" size={50} />
              <p className={styles.body} style={{ marginTop: "10px" }}>
                Uploading... Please wait.
              </p>
            </div>
          ) : (
            <UploadButton
              onFileUpload={handleFileUpload}
              label="Upload Here"
              iconSrc="/icons/pdf-icon.png"
            />
          )}
        </div>

        {/* If file is uploaded, display uploaded file details and the delete button */}
        {uploadedFile && fileId && (
          <div style={{ marginTop: "20px" }}>
            <p>Uploaded File: {uploadedFile.name}</p>
            <DeleteFileButton
              fileId={fileId}
              onDeleteSuccess={handleFileDeleteSuccess} // Pass success handler
            />
          </div>
        )}
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <Box sx={{ textAlign: "center", maxWidth: "250px" }}>
      {icon}
      <Typography
        variant="h6"
        sx={{
          marginTop: "10px",
          fontSize: "1.2rem",
          color: "#555",
          fontFamily: "inherit", // Ensures consistency with the page's font style
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#777",
          marginTop: "10px",
          fontFamily: "inherit", // Ensures consistency with the page's font style
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
