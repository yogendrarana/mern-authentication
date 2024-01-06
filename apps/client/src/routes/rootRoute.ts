import { RootRoute, Route, Router } from '@tanstack/react-router'


// import routes
import * as authRoutes from './authRoutes'
import * as userRoutes from './userRoutes'


// import components
import HomePage from '../ui/pages/home/HomePage';
import RootLayout from '../ui/layouts/RootLayout';


// rootRoute is the root route for the app
export const rootRoute = new RootRoute({
    component: RootLayout
});


// indexRoute is the default route for the app
export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
});


// routeTree is the root of the route tree
export const routeTree = rootRoute.addChildren([
    indexRoute,
    authRoutes.loginRoute, authRoutes.registerRoute,
    userRoutes.profileRoute
]);


// router is the router instance
export const router = new Router({ routeTree: routeTree });


// declare the router module
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

