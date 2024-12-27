import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Output from './components/Output';
import { sanitizeText } from './utils/sanitize';
import * as pdfjsLib from 'pdfjs-dist';
import { extractTextFromPdf } from './utils/extractText';  // Import the extractTextFromPdf function
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [sanitizedText, setSanitizedText] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleFileChange = (file) => {
    setFile(file);
    checkSubmitEnabled(file, url);
  };

  const handleUrlChange = (url) => {
    setUrl(url);
    checkSubmitEnabled(file, url);
  };

  const checkSubmitEnabled = (file, url) => {
    // Enable Submit button if both file and URL are provided
    setIsSubmitEnabled(file && url && validateUrl(url));
  };

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zAzechA-Z]{2,6}(\/\S*)?$/;
    return regex.test(url);
  };

  const handleSubmit = async () => {
    if (!file || !url) return;

    // Extract PDF text and sanitize
    const extractedText = await extractTextFromPdf(file);
    const sanitized = sanitizeText(extractedText);
    setSanitizedText(sanitized); // Set sanitized text to display

    // Send sanitized text to the backend (via API)
    await sendToBackend(sanitized);
  };

  const sendToBackend = async (text) => {
    try {
      const response = await axios.post('/your-backend-endpoint', { text });
      console.log("Text sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending text to backend:", error);
    }
  };

  return (
    <div>
      <FileUpload 
        onFileChange={handleFileChange} 
        onUrlChange={handleUrlChange} 
        onSubmit={handleSubmit} 
        isSubmitEnabled={isSubmitEnabled} 
      />
      <Output content={sanitizedText} />
    </div>
  );
};

export default App;
