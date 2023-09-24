import axios from 'axios';

console.log('CREATING AXIOS');
console.log(import.meta.env.VITE_API_BASE_URL);
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export default axiosClient;
