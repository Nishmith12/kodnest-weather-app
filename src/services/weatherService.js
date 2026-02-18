import axios from 'axios';

const BASE_URL = 'http://api.weatherstack.com';

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

export const getCurrentWeather = async (query, apiKey) => {
  try {
    const response = await weatherApi.get('/current', {
      params: {
        access_key: apiKey,
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getHistoricalWeather = async (query, date, apiKey) => {
  try {
    const response = await weatherApi.get('/historical', {
      params: {
        access_key: apiKey,
        query: query,
        historical_date: date, // YYYY-MM-DD
        hourly: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

export const getMarineWeather = async (query, apiKey) => {
  try {
    const response = await weatherApi.get('/marine', {
      params: {
        access_key: apiKey,
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching marine weather:', error);
    throw error;
  }
};
