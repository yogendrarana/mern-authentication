import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8000/api/v1';

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});
