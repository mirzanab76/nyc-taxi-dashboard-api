// server/src/services/socrataService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DATASET_ID = 'gkne-dk5s';
const BASE_URL = `https://data.cityofnewyork.us/resource/${DATASET_ID}.json`;

export const getTaxiData = async (filters = {}) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    // Set a reasonable limit
    params.append('$limit', '1000');

    // Build SoQL query
    const whereConditions = [];

    // Add date range filter if provided
    if (filters.startDate && filters.endDate) {
      whereConditions.push(`pickup_datetime between '${filters.startDate}' and '${filters.endDate}'`);
    }

    // Add fare range filter if provided
    if (filters.minFare !== undefined || filters.maxFare !== undefined) {
      if (filters.minFare !== undefined) {
        whereConditions.push(`fare_amount >= ${filters.minFare}`);
      }
      if (filters.maxFare !== undefined) {
        whereConditions.push(`fare_amount <= ${filters.maxFare}`);
      }
    }

    // Add distance range filter if provided
    if (filters.minDistance !== undefined || filters.maxDistance !== undefined) {
      if (filters.minDistance !== undefined) {
        whereConditions.push(`trip_distance >= ${filters.minDistance}`);
      }
      if (filters.maxDistance !== undefined) {
        whereConditions.push(`trip_distance <= ${filters.maxDistance}`);
      }
    }

    // Add payment type filter if provided
    if (filters.paymentType && filters.paymentType !== 'all') {
      whereConditions.push(`payment_type = '${filters.paymentType}'`);
    }

    // Combine all conditions
    if (whereConditions.length > 0) {
      params.append('$where', whereConditions.join(' AND '));
    }

    // Select specific fields to optimize response
    params.append('$select', 'pickup_datetime,dropoff_datetime,pickup_latitude,pickup_longitude,dropoff_latitude,dropoff_longitude,trip_distance,fare_amount,payment_type');

    // Add sorting
    params.append('$order', 'pickup_datetime DESC');

    console.log('Fetching data from Socrata:', `${BASE_URL}?${params.toString()}`);

    const response = await axios.get(BASE_URL, {
      params: Object.fromEntries(params),
      headers: {
        'Accept': 'application/json'
      }
    });

    return response.data;

  } catch (error) {
    console.error('Socrata API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch data from Socrata API');
  }
};