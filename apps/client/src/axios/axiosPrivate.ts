import axios from "axios";

const baseURL = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8000/api/v1';

const axiosPrivate = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosPrivate;