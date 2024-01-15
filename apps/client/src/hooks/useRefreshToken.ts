import axios from "../axios/axios";
import { useAuthStore } from "../store/useAuthStore";


const useRefreshToken = () => {

    return async function refreshToken(): Promise<string | null> {
        try {
            const { data, status } = await axios.get('/token/refresh', {
                withCredentials: true
            });

            if (status === 200) {
                // update the access token in the store
                useAuthStore.setState((state) => ({
                    ...state,
                    isAuthenticated: true,
                    accessToken: data.data.accessToken,
                    authUser: data.data.user,
                }));

                return data.data.accessToken;
            }

            return null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            useAuthStore.setState((state) => ({
                ...state,
                isAuthenticated: false,
                accessToken: null,
                authUser: null,
            }));

            return null;
        }
    }
};

export default useRefreshToken;