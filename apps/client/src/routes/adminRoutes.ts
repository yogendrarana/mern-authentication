import { rootRoute } from "./rootRoute";
import { Route } from "@tanstack/react-router";

// import pages
import AdminLayout from "../app/pages/admin/AdminLayout";
import Dashboard from "../app/pages/admin/Dashboard";
import UsersList from "../app/pages/admin/UsersList";


// root route for the admin section
export const adminRoutes = new Route({
    getParentRoute: () => rootRoute,
    path: "admin",
    component: AdminLayout,
});


// index route for the admin section
export const adminIndexRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "/",
    component: Dashboard,
});


// user management route for the admin section
export const adminUserManagementRoute = new Route({
    getParentRoute: () => adminRoutes,
    path: "users",
    component: UsersList,
});


