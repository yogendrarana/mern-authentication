import { create } from "zustand";
import axios from "../axios/axios";
import { devtools } from "zustand/middleware";
import * as UserTypes from "../types/user.type";

// auth states
interface AuthStates {
    isLoading: boolean,
    message: string | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authUser: any | null,
    isAuthenticated: boolean,
    accessToken: string | null,
}

// auth actions
interface AuthActions {
    loginUser: (credentials: UserTypes.LoginCredentialsType) => void,
    registerUser: (credentials: UserTypes.RegisterCredentialsType) => void,
    logoutUser: () => void,
}


// initial states
const initialState: AuthStates = {
    message: null,
    isLoading: false,

    authUser: null,
    accessToken: null,
    isAuthenticated: false,
};

// useAuthStore
export const useAuthStore = create<AuthStates & AuthActions>()(
    devtools((set) => ({

        // initial states
        ...initialState,

        // login action
        loginUser: async (credentials) => {
            try {
                set({ isLoading: true });
                const { data } = await axios.post('/auth/login', credentials, { withCredentials: true, });

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
                    isLoading: false,
                    isAuthenticated: false,
                    message: err.response.data.message,
                }));
            }
        },

        // register action
        registerUser: async (credentials) => {
            try {
                set({ isLoading: true });
                const { data, status } = await axios.post('/auth/register', credentials, { withCredentials: true });

                if (status === 201) {
                    set({
                        isLoading: false,
                        isAuthenticated: true,
                        message: data.message,
                        authUser: data.data.user,
                        accessToken: data.data.accessToken
                    });
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                set((state) => ({
                    ...state,
                    isLoading: false,
                    isAuthenticated: false,
                    message: err.response.data.message,
                }));
            }
        },

        // logout action
        logoutUser: () => { },
    }))
);