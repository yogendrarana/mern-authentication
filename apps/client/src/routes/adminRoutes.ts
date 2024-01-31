import toast from "react-hot-toast";
import { rootRoute } from "./rootRoute";
import axiosPrivate from "../axios/axiosPrivate";
import { Route, redirect } from "@tanstack/react-router";

// import pages
import Dashboard from "../app/pages/admin/Dashboard";
import UsersList from "../app/pages/admin/UsersList";
import AdminLayout from "../app/pages/admin/AdminLayout";


// root route for the admin section
export const adminRoutes = new Route({
    getParentRoute: () => rootRoute,
    path: "admin",
    component: AdminLayout,
    // beforeLoad: async () => {
    //     try {
    //         await axiosPrivate.get('/admin');
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     } catch (err: any) {
    //         if (err.response && (err.response.status === 401 || err.response.status === 403)) {
    //             toast.error(err.response.data.message);
    //             throw redirect({ to: '/' });
    //         }
    //     }
    // }
});


// index route for the admin section
export const adminIndexRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "/",
    component: Dashboard,
    loader: async () => {
        try {
            const { data, status } = await axiosPrivate.get('/admin/dashboard');

            if (status >= 400) {
                return null;
            }

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error("Unauthorized");
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                toast.error(err.response.data.message);
                throw redirect({ to: '/' });
            }
        }
    },
    shouldReload: () => true,
    gcTime: 0
});


// user management route for the admin section
export const adminUserManagementRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "users",
    component: UsersList
});


