import { rootRoute } from "./rootRoute";
import { useAuthStore } from "../store/useAuthStore";
import { Route, redirect } from "@tanstack/react-router";

// import pages
import AdminLayout from "../app/layouts/AdminLayout";
import Dashboard from "../app/pages/admin/Dashboard";

export const adminRoutes = new Route({
    getParentRoute: () => rootRoute,
    path: "admin",
    component: AdminLayout,
    beforeLoad: () => {
        const { isAuthenticated, accessToken } = useAuthStore.getState();
        if (!isAuthenticated || !accessToken) {
            throw redirect({ to: "/login" });
        }
    }
});

export const adminIndexRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "/",
    component: Dashboard,
});


