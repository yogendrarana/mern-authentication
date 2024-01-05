import { RootRoute, Route, Router } from '@tanstack/react-router'

// import routes
import * as authRoutes from './authRoutes'

// import components
import HomePage from '../ui/pages/home/HomePage';

// rootRoute is the root route for the app
export const rootRoute = new RootRoute();

// indexRoute is the default route for the app
export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
});

// routeTree is the root of the route tree
export const routeTree = rootRoute.addChildren([
    indexRoute, 
    authRoutes.loginRoute, 
    authRoutes.registerRoute
]);

// router is the router instance
export const router = new Router({ routeTree: routeTree });

// declare the router module
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

