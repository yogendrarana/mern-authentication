import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // zustand store
    const { loginUser, isLoading, isAuthenticated, successMessage, errorMessage } = useAuthStore();

    // login handler
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error('Please fill in all fields');
        }

        loginUser({ email, password })
    }

    
    useEffect(() => {
        if (isAuthenticated && successMessage) {
            toast.success(successMessage);
            navigate({ to: '/' });
        }

        if (!isAuthenticated && errorMessage) {
            toast.error(errorMessage);
        }

        useAuthStore.setState((state) => ({ ...state, successMessage: null, errorMessage: null }));
    }, [isAuthenticated, successMessage, errorMessage, navigate]);


    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-[2rem] items-center">
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 placeholder:text-center"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 placeholder:text-center"
            />

            <button
                type="submit"
                disabled={isLoading}
                className="border-2 p-[0.5rem] rounded-md hover:bg-gray-200"
            >
                Login
            </button>
        </form>
    )
}

export default LoginForm;