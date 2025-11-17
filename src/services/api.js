import axios from 'axios';

const API_BASE_URL = 'https://weather-api-aggregator.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const weatherAPI = {
    // Get current weather
    getWeather: (city) => api.get(`/weather?city=${city}`),

    // Get weather history
    getHistory: (city, hours = 24) => api.get(`/weather/history/${city}?hours=${hours}`),

    // Get statistics
    getStats: (city, hours = 24) => api.get(`/weather/stats/${city}?hours=${hours}`),

    // Get trend analysis
    getTrend: (city, hours = 24) => api.get(`/weather/trend/${city}?hours=${hours}`),

    // Get source comparison
    compareSources: (city, hours = 24) => api.get(`/weather/compare/${city}?hours=${hours}`),

    // Get hourly data
    getHourly: (city, hours = 24) => api.get(`/weather/hourly/${city}?hours=${hours}`),
};

export default api;