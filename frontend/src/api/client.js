import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export const fetchOffers = async () => {
    const data = await apiClient.get('/api/paniers');
    return data;
};

export default apiClient;