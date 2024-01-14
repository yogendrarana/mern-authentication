import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axiosPrivate from "../axios/axiosPrivate";
import { useAuthStore } from "../store/useAuthStore";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken } = useAuthStore();

    useEffect(() => {
        // request interceptor
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        // response interceptor
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config;

                if ((error.response.status === 401 || error.response.status === 403) && !prevRequest?.isSent) {
                    // set the flag so that we don't retry the request
                    prevRequest.isSent = true;

                    // get the new access token
                    const accessToken = await refresh();

                    // if access token is null, make the user login again
                    // because refresh token is expired
                    if (!accessToken) {
                        return Promise.reject(error);
                    }

                    // update the headers
                    prevRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh]);

    
    // return private instance of axios
    return axiosPrivate;
}

export default useAxiosPrivate;