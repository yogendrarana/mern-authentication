import { Outlet } from "@tanstack/react-router"
import useRefreshToken from "../../hooks/useRefreshToken";
import { authStore } from "../../store/useAuthStore";
import { useEffect } from "react";

const RootLayout = () => {
    // const refresh = useRefreshToken();
    // const { isAuthenticated, authUser } = useAuthStore();

    // // verify refresh token
    // const verifyRefreshToken = async () => {
        
    // }

    // useEffect(() => {
    //     let isMouted = true;


    // }, []);

    return <Outlet />
}

export default RootLayout;