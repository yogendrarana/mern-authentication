import { useEffect, useState } from "react";
import { Outlet } from "@tanstack/react-router"
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuthStore } from "../../store/useAuthStore";


const RootLayout = () => {
    const refresh = useRefreshToken();

    // global state
    const { accessToken } = useAuthStore();

    // local state
    const [, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        // verify refresh token
        const verifyRefreshToken = async () => {
            try {
                setIsLoading(true);
                await refresh();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setIsLoading(false);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !accessToken ? verifyRefreshToken() : setIsLoading(false);
        
        return () => {
            isMounted = false;
        }
    }, []);

    // return
    return <Outlet />
}

export default RootLayout;