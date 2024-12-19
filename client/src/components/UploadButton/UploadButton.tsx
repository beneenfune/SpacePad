import React, { ChangeEvent } from "react";
import Image from "next/image";
import styles from "./UploadButton.module.css";

interface UploadButtonProps {
  onFileUpload: (file: File | null) => void;
  label: string;
  iconSrc?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onFileUpload,
  label,
  iconSrc,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileUpload(file);
  };

  return (
    <label className={styles.uploadButton}>
      {iconSrc && (
        <Image
          className={styles.icon}
          src={iconSrc}
          alt="Upload Icon"
          width={40}
          height={40}
        />
      )}
      {label}
      <input
        type="file"
        className={styles.fileInput}
        onChange={handleFileChange}
        accept=".pdf" // To accept only PDFs and PPTs: accept=".pdf,.ppt,.pptx"
      />
    </label>
  );
};

export default UploadButton;
