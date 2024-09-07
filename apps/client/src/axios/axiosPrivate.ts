import axios from "axios"
import axiosPublic from './axios'
import { useAuthStore } from "../store/useAuthStore";

// axios instance
const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8000/api/v1',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});


// request interceptor
axiosPrivate.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const accessToken = useAuthStore.getState().accessToken;

            if (!accessToken) {
                // Handle the error when there is no access token
                return Promise.reject(new Error('No access token available'));
            }

            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// response interceptor
axiosPrivate.interceptors.response.use(
    response => response,
    async error => {
        const prevRequest = error?.config;

        
        if ((error.response.status === 401 || error.response.status === 403) && !prevRequest?.isSent) {
            // set the flag so that we don't retry the request
            prevRequest.isSent = true;
            
            // get the new access token
            const { data, status } = await axiosPublic.get('/token/refresh', { withCredentials: true });

            // check if the status is 400 or above
            if (status === 400 || status === 401 || status === 403) {
                // Handle the error when refresh token is expired
                useAuthStore.setState((state) => ({
                    ...state,
                    isAuthenticated: false,
                    accessToken: null,
                    authUser: null,
                }));

                return Promise.reject(error);
            }

            // check if the status is 200
            if (status === 200) {
                // update the access token in the store
                useAuthStore.setState((state) => ({
                    ...state,
                    isAuthenticated: true,
                    accessToken: data.data.accessToken,
                    authUser: data.data.user,
                }));
            }

            // update the headers
            const newAccessToken = useAuthStore.getState().accessToken;
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // retry the request
            return axiosPrivate(prevRequest);
        }

        // return error if it's not related to access token
        return Promise.reject(error);
    }
);

// export axios instance
export default axiosPrivate;