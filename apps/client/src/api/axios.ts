import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

// Add interceptors to the axios instance
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // console.log("error-response", error.response);

        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export { axiosInstance as axios };