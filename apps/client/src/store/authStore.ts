import { create } from "zustand";
import axios from "axios";

export type AuthState = {
    authUser: unknown,
    isLoading: boolean,
    isAuthenticated: boolean,
    accessToken: string | null,
}

export type AuthActions = {
    loginUser: (credentials: { email: string, password: string }) => void,
    registerUser: (credentials: { email: string, password: string }) => void,
    logoutUser: () => void,
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({

    // State
    authUser: null,
    isLoading: false,
    isAuthenticated: false,
    accessToken: null,

    // login action
    loginUser: async (credentials) => {
        try {
            set({ isLoading: true });
            const { data } = await axios.post('/auth/login', credentials, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (err: any) {
            console.log(err);
        }
    },

    // register action
    registerUser: () => { },

    // logout action
    logoutUser: () => { },
}));