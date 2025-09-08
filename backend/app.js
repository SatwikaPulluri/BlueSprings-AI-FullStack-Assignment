const express = require('express');
const cors = require('cors');
const chatRoutes = require('./src/routes/chatRoutes');
require('dotenv').config();
require('./src/utils/db'); // DB connection

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
