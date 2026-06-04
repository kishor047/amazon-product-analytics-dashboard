import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export const scrapeAmazon = (url, fields) => api.post('/scrape', { url, fields });
export const getAnalytics = () => api.get('/analytics');
export const getProducts = () => api.get('/products');
