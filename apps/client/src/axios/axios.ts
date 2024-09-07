import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'withCredentials': 'true'
    }
});
