const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    message: 'Giftz backend is running',
    docs: '/api',
  });
});

app.get('/api', (_, res) => {
  res.json({
    service: 'Giftz API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`Giftz backend API running on http://localhost:${PORT}`);
});
