import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cine-o753.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
