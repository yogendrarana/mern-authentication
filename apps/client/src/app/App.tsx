import { Toaster } from "react-hot-toast"
import { useEffect, useRef, useState } from "react"
import { Outlet } from "@tanstack/react-router"

// hooks
import { useAuthStore } from "../store/useAuthStore"
import useRefreshToken from "../hooks/useRefreshToken"

const RootLayout = () => {
    const isMountedRef = useRef(false);
    const refreshToken = useRefreshToken();

    // global state
    const { accessToken } = useAuthStore();

    // local state
    const [, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (!isMountedRef.current) {
            // verify refresh token
            const getNewAccessToken = async () => {
                try {
                    setIsLoading(true);
                    await refreshToken();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                    setIsLoading(false);
                } finally {
                    isMounted && setIsLoading(false);
                }
            }

            // Avoids unwanted call to getNewAccessToken
            !accessToken ? getNewAccessToken() : setIsLoading(false);

            // Avoids unwanted call to getNewAccessToken
            isMountedRef.current = true;
        }

        return () => {
            isMounted = false;
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