import { useState } from "react";

type DeleteFileProps = {
  fileId: number; // The id of the file to be deleted
  onDeleteSuccess: () => void; // Prop to notify parent when delete is successful
};

const DeleteFileButton: React.FC<DeleteFileProps> = ({
  fileId,
  onDeleteSuccess,
}) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null); // Message for success or error

  const handleDeleteFile = async (fileId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/delete/${fileId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setMessage("File deleted successfully!");
      console.log(`File with ID ${fileId}deleted successfully.`);
      
      // Notify parent component that deletion was successful
      onDeleteSuccess();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting the file");
    } finally {
      setIsConfirming(false);
      setIsDeleting(false);
    }
  };

  const handleConfirmDelete = () => {
    setIsConfirming(true);
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Delete Button with Red X */}
        {!isConfirming && (
          <button
            onClick={handleConfirmDelete}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            X
          </button>
        )}

        {/* Confirmation Dialog */}
        {isConfirming && (
          <div style={{ marginLeft: "10px" }}>
            <p>Are you sure you want to delete this file?</p>
            <button
              onClick={() => handleDeleteFile(fileId)}
              disabled={isDeleting}
              style={{ marginRight: "10px" }}
            >
              Yes
            </button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        )}
      </div>

      {/* Success or Error message */}
      {message && <p>{message}</p>}

      {/* Show loading spinner during deletion */}
      {isDeleting && <p>Deleting...</p>}
    </div>
  );
};

export default DeleteFileButton;
