import { rootRoute } from './rootRoute';
import { Route } from "@tanstack/react-router";

// import pages
import ProfileLayout from '../app/pages/profile/ProfileLayout';
import ProfileDetails from '../app/pages/profile/ProfileDetails';
import ProfileSettings from '../app/pages/profile/ProfileSettings';


// root route for the profile section
export const profileRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "profile",
    component: ProfileLayout
});


// index route for the profile section
export const profileIndexRoute = new Route({
    getParentRoute: () => profileRoute,
    path: "/",
    component: ProfileDetails
})


// settings route for the profile section
export const profileSettingsRoute = new Route({
    getParentRoute: () => profileRoute,
    path: "settings",
    component: ProfileSettings
})