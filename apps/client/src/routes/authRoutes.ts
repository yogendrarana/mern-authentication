import { rootRoute } from './rootRoute';
import { Route } from "@tanstack/react-router";

// import pages
import LoginPage from '../ui/pages/auth/LoginPage';
import RegisterPage from '../ui/pages/auth/RegisterPage';


// login route
export const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "login",
    component: LoginPage,
});

// register route
export const registerRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "register",
    component: RegisterPage,
});