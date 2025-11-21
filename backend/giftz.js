const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const platformAdminRoutes = require('./routes/platformAdminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const uploadsDir = path.join(__dirname, 'data', 'images');

fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/media', express.static(uploadsDir));

app.get('/', (_, res) => {
  res.json({
    message: 'Giftz backend is running',
    docs: '/api',
  });
});

app.use('/api', platformAdminRoutes);

app.use((_, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Giftz backend API running on http://localhost:${PORT}`);
});
