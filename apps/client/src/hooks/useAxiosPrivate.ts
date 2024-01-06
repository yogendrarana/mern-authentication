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

                if (error.response.status === (401 || 403) && !prevRequest?.isSent) {
                    // set the flag so that we don't retry the request
                    prevRequest.isSent = true;

                    // get new access token
                    const accessToken = await refresh();

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

    // return
    return axiosPrivate;
}

export default useAxiosPrivate;