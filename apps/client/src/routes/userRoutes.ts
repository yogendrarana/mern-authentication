import { rootRoute } from './rootRoute';
import { Route } from "@tanstack/react-router";

// import pages
import ProfilePage from '../app/pages/profile/ProfilePage';

export const profileRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "profile",
    component: ProfilePage,
});