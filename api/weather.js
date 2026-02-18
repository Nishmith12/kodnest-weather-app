import axios from 'axios';

export default async function handler(request, response) {
    const { endpoint, ...queryParams } = request.query;

    if (!endpoint) {
        return response.status(400).json({ error: 'Endpoint parameter is required' });
    }

    const BASE_URL = 'http://api.weatherstack.com';

    try {
        const apiResponse = await axios.get(`${BASE_URL}/${endpoint}`, {
            params: queryParams,
        });

        return response.status(200).json(apiResponse.data);
    } catch (error) {
        console.error('Proxy error:', error);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return response.status(error.response.status).json(error.response.data);
        }

        return response.status(500).json({ error: 'Failed to fetch data from Weatherstack' });
    }
}
