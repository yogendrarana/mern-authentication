import { create } from "zustand";
import { axios } from "../api/axios";
import { devtools } from "zustand/middleware";

interface AuthState {
    // states
    isLoading: boolean,
    isError: boolean,
    message: string | null,

    authUser: unknown,
    isAuthenticated: boolean,
    accessToken: string | null,

    // actions
    loginUser: (credentials: { email: string, password: string }) => void,
    registerUser: (credentials: { email: string, password: string }) => void,
    logoutUser: () => void,
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({

        // State
        message: null,
        isError: false,
        isLoading: false,

        authUser: null,
        accessToken: null,
        isAuthenticated: false,

        // login action
        loginUser: async (credentials) => {
            try {
                set({ isLoading: true });
                const { data } = await axios.post('/auth/login', credentials, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                });

                set((state) => ({
                    ...state,
                    isLoading: false,
                    isAuthenticated: true,
                    authUser: data.data.user,
                    accessToken: data.data.accessToken,
                    message: data.message
                }));

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                set((state) => ({
                    ...state,
                    isError: true,
                    isLoading: false,
                    isAuthenticated: false,
                    message: err.response.data.message,
                }));
            }
        },

        // register action
        registerUser: () => { },

        // logout action
        logoutUser: () => { },
    }))
);