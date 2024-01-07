import axios from "../axios/axios";
import { rootRoute } from "./rootRoute";
import { Route, redirect } from "@tanstack/react-router";

// import pages
import AdminLayout from "../app/layouts/AdminLayout";
import Dashboard from "../app/pages/admin/Dashboard";

export const adminRoutes = new Route({
    getParentRoute: () => rootRoute,
    path: "admin",
    component: AdminLayout,
    beforeLoad: async ({ location }) => {
        try {
            await axios.get("/admin");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.response.status === (401 || 403)) {
                throw redirect({ to: "/login", search: { redirect: location.href } });
            }
        }
    }
});

export const adminIndexRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "/",
    component: Dashboard,
});


