import { useState, ChangeEvent } from "react";
import axios from "axios";
import { API_URL } from "../conf";

const FileUploader = ({
  fileName,
  callback,
}: {
  fileName: string;
  callback: (url: string) => void;
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      setUrl(imageUrl);

      if (callback) {
        callback(imageUrl);
      }

      setUploading(false);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
      setUploading(false);

      if (error.response) {
        console.log("Error response: ", error.response);
        console.log("Error data: ", error.response.data);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {url && (
        <div>
          <p>
            File uploaded:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
