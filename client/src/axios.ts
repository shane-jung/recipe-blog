import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://localhost:3000/api/',
});

export default axiosClient;
