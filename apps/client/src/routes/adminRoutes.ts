import { rootRoute } from "./rootRoute";
import { Route } from "@tanstack/react-router";

// import pages
import AdminLayout from "../app/layouts/AdminLayout";
import Dashboard from "../app/pages/admin/Dashboard";

export const adminRoutes = new Route({
    getParentRoute: () => rootRoute,
    path: "admin",
    component: AdminLayout,
});

export const adminIndexRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "/",
    component: Dashboard,
});


