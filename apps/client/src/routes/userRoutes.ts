import { rootRoute } from './rootRoute';
import { useAuthStore } from '../store/useAuthStore';
import { Route, redirect } from "@tanstack/react-router";



// import pages
import ProfilePage from '../app/pages/profile/ProfilePage';

export const profileRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "profile",
    component: ProfilePage,
    beforeLoad: ({ location }) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) {
            throw redirect({ to: "/login", search: { redirect: location.href, }, });
        }
    }
});