const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

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

app.get('/version', (req, res) => {
    res.json({
        version: "v2",
        build: "GitOps Validation"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});
