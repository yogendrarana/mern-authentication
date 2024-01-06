import { rootRoute } from './rootRoute';
import { Route, redirect } from "@tanstack/react-router";
import ProfilePage from '../ui/pages/profile/ProfilePage';
import { useAuthStore } from '../store/useAuthStore';

// import pages

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