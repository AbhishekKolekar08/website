import React, { useState } from "react";
import extractTextFromPdf from "../utils/extractText";  // Corrected to default import
import { sanitizeText } from "../utils/sanitize";  // Import sanitize function
import axios from "axios";  // For sending sanitized text to the backend

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(""); // Add state for URL
  const [sanitizedText, setSanitizedText] = useState(""); // To store sanitized text
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);  // Controls submit button

  // Handle file selection
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setSubmitEnabled(url !== ""); // Enable submit if URL is present
    }
  };

  // Handle URL input
  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    setSubmitEnabled(file !== null && inputUrl !== ""); // Enable submit if file and URL are both present
  };

  // Handle the extraction and sanitization process
  const handleSubmit = async () => {
    if (file && url) {
      const extractedText = await extractTextFromPdf(file); // Extract text from the uploaded PDF
      const sanitized = sanitizeText(extractedText); // Sanitize the extracted text
      setSanitizedText(sanitized);  // Update the state with sanitized text
      await sendToBackend(sanitized);  // Send sanitized text to the backend
    }
  };

  // Send the sanitized text to the backend
  const sendToBackend = async (text) => {
    try {
      const response = await axios.post("/your-backend-endpoint", { text, url });
      console.log("Text sent to backend successfully:", response.data);
    } catch (error) {
      console.error("Error sending text to backend:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input 
        type="text" 
        placeholder="Enter URL" 
        value={url} 
        onChange={handleUrlChange} 
      />
      <button onClick={handleSubmit} disabled={!isSubmitEnabled}>
        Submit
      </button>
      {sanitizedText && <div>{sanitizedText}</div>} {/* Display sanitized text (optional) */}
    </div>
  );
};

export default FileUpload;
