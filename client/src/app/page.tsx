"use client"; 

import Image from "next/image";
import styles from "./page.module.css";
import { FaRocket } from "react-icons/fa";
import UploadButton from "@/components/UploadButton/UploadButton";
import DeleteFileButton from "@/components/DeleteFileButton/DeleteFileButton";
import { useState } from "react";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<number | null>(null); // To store file ID from server after upload

  const handleFileUpload = async (file: File | null) => {
    setUploadedFile(file);
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
        } else {
          console.error("Failed to upload file:", result.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
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
        <ol>
          <header className={styles.header}>
            Welcome to SpacePad <FaRocket className={styles.rocketIcon} />
          </header>
          <div className={styles.h2}>
            Create Space around your lecture notes for easy note-taking on your
            iPad.
          </div>
          <div className={styles.body}>
            Upload your PDF or PPT lecture slides and customize them with extra
            space for note-taking. With SpacePad, you can choose the placement
            and size of each lecture page, adjusting the orientation to
            landscape or portrait to fit your note-taking preference.
          </div>
        </ol>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/home-steps.png"
            alt="Steps for how to use SpacePad"
            layout="intrinsic"
            width={500}
            height={300}
          />
        </div>

        <div className={styles.ctas}>
          <UploadButton
            onFileUpload={handleFileUpload}
            label="Upload Here"
            iconSrc="/icons/pdf-icon.png"
          />
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
