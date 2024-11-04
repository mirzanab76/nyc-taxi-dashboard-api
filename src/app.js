// server/src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTaxiData } from './services/socrataService.js';

dotenv.config();

const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'NYC Taxi API is running'
  });
});

// API endpoint for taxi trips
app.get('/api/trips', async (req, res) => {
  try {
    console.log('Received query params:', req.query); // Debug log

    const {
      startDate,
      endDate,
      minFare,
      maxFare,
      minDistance,
      maxDistance,
      paymentType
    } = req.query;

    const data = await getTaxiData({
      startDate,
      endDate,
      minFare: minFare ? Number(minFare) : undefined,
      maxFare: maxFare ? Number(maxFare) : undefined,
      minDistance: minDistance ? Number(minDistance) : undefined,
      maxDistance: maxDistance ? Number(maxDistance) : undefined,
      paymentType
    });

    // Send successful response
    res.json({
      status: 'success',
      data: data
    });

  } catch (error) {
    console.error('Error fetching taxi data:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch taxi data'
    });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;