import { getTaxiData } from '../services/socrataService.js';

export const getTripData = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      minFare,
      maxFare,
      minDistance,
      maxDistance,
      paymentType
    } = req.query;

    console.log('Received query params:', req.query); 

    const filters = {
      startDate,
      endDate,
      minFare: minFare ? Number(minFare) : undefined,
      maxFare: maxFare ? Number(maxFare) : undefined,
      minDistance: minDistance ? Number(minDistance) : undefined,
      maxDistance: maxDistance ? Number(maxDistance) : undefined,
      paymentType
    };

    const data = await getTaxiData(filters);

    res.json({
      status: 'success',
      data: data
    });

  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
};