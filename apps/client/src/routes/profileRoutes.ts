import { rootRoute } from './rootRoute';
import { Route } from "@tanstack/react-router";

// import pages
import Profiles from '../app/pages/profile/Profile';
import ProfileLayout from '../app/pages/profile/ProfileLayout';
import ProfileSettings from '../app/pages/profile/ProfileSettings';

// root route for the profile section
export const profileRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "profile",
    component: ProfileLayout,
});


// index route for the profile section
export const profileIndexRoute = new Route({
    getParentRoute: () => profileRoute,
    path: "/",
    component: Profiles,
    loader: async () => {
        try {
            return { name: "Yogendra", email: "yogendra@gmail.com" };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = '/login';
            }
        }
    }
})


// settings route for the profile section
export const profileSettingsRoute = new Route({
    getParentRoute: () => profileRoute,
    path: "settings",
    component: ProfileSettings
})