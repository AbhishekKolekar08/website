const express = require('express');
const axios = require('axios');
const { exec } = require('child_process');
const app = express();
const port = 5000;

app.use(express.json());

// Route to handle scraping
app.post('/scrape', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  // Call Python script to scrape the URL
  exec(`python3 scrape.py ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error scraping the URL');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error scraping the URL');
    }

    // Send the scraped content back to the frontend
    res.send({ content: stdout });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});