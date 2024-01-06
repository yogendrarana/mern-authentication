import axios from "../axios/axios";
import { useAuthStore } from "../store/useAuthStore";

const useRefreshToken = () => {
    async function refresh(): Promise<string> {
        const { data } = await axios.get('/refresh', {
            withCredentials: true
        });

        // update the access token in the store
        useAuthStore.setState((state) => ({ ...state, accessToken: data.data.accessToken }));

        return data.data.accessToken;
    }

    // return
    return refresh;
}

export default useRefreshToken;