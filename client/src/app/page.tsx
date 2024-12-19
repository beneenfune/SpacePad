"use client"; // This ensures the component is rendered as a Client Component

import Image from "next/image";
import styles from "./page.module.css";
import { FaRocket } from "react-icons/fa";
import UploadButton from "@/components/UploadButton/UploadButton";
import { useState } from "react";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
    if (file) {
      console.log("Uploaded file:", file.name);
      // TODO: Add additional logic for processing the uploaded file
    }
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
            and size of each lecture page, adjusting the orienntation to
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
            layout="intrinsic" // maintains the original size
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
        {uploadedFile && <p>Uploaded File: {uploadedFile.name}</p>}
      </main>
    </div>
  );
}
