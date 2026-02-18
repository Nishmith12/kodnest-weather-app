import axios from 'axios';

const BASE_URL = 'http://api.weatherstack.com';

// Check if we are in production
const isProduction = import.meta.env.PROD;

const weatherApi = axios.create({
  baseURL: isProduction ? '/api/weather' : BASE_URL,
});

// Helper to construct requests based on environment
const makeRequest = async (endpoint, params) => {
  if (isProduction) {
    // In production, we send the endpoint and all params to our proxy
    return await weatherApi.get('', {
      params: {
        endpoint: endpoint,
        ...params
      }
    });
  } else {
    // Locally, we hit the API directly
    return await weatherApi.get(`/${endpoint}`, { params });
  }
};

export const getCurrentWeather = async (query, apiKey) => {
  try {
    const response = await makeRequest('current', {
      access_key: apiKey,
      query: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getHistoricalWeather = async (query, date, apiKey) => {
  try {
    const response = await makeRequest('historical', {
      access_key: apiKey,
      query: query,
      historical_date: date, // YYYY-MM-DD
      hourly: 1,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

export const getMarineWeather = async (query, apiKey) => {
  try {
    const response = await makeRequest('marine', {
      access_key: apiKey,
      query: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching marine weather:', error);
    throw error;
  }
};
