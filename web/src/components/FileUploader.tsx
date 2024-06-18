import { useState, ChangeEvent, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../conf";
import { useTranslation } from "react-i18next";

const FileUploader = ({
  fileName,
  callback,
  children,
}: {
  fileName: string;
  callback: (url: string) => void;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    // Get pre-signed URL from backend
    const fileType = file.type;

    try {
      const response = await axios.get(`${API_URL}/upload-url`, {
        params: {
          fileName,
          fileType,
        },
      });

      const { url: uploadUrl } = response.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": fileType,
        },
      });

      const imageUrl = uploadUrl.split("?")[0];

      if (callback) {
        callback(imageUrl);
      }

      setUrl(imageUrl);
      setUploading(false);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
      setUploading(false);

      if (error.response) {
        console.error("Error response: ", error.response);
        console.error("Error data: ", error.response.data);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <div
        onClick={triggerFileInput}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {children || (
          <button disabled={!file || uploading}>
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {url && (
        <div>
          <p className="text-green-500">{t("fileUploader.success")}</p>
          {/* <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a> */}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
