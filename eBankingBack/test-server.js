// Simple test file to verify backend functionality
const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'eBanking Backend is working!',
    timestamp: new Date().toISOString()
  });
});

const PORT = 4023;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/test`);
});
