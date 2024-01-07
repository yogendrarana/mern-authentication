import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { Outlet } from "@tanstack/react-router"

// hooks
import { useAuthStore } from "../../store/useAuthStore"
import useRefreshToken from "../../hooks/useRefreshToken"

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

        // const refreshTokenInterval = setInterval(async () => {
        //     await refresh();
        // }, 5000);

        return () => {
            isMounted = false;
            // clearInterval(refreshTokenInterval);
        }
    }, []);

    return (
        <>
            <Outlet />
            <Toaster />
        </>
    )
}

export default RootLayout;