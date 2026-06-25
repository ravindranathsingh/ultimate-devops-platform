const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP'
  });
});

app.get('/version', (req, res) => {
  res.status(200).json({
    version: '1.0.0'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
