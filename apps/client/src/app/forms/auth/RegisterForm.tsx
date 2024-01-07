import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../store/useAuthStore";

const RegisterForm = () => {
    const navigate = useNavigate();

    // local state
    const [credentials, setCredentials] = useState({
        name: '', email: '', password: '', confirm_password: ''
    });

    // zustand store
    const { registerUser, isLoading, isAuthenticated, message } = useAuthStore();


    // login handler
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check if any field is empty
        if (!credentials.name || !credentials.email || !credentials.password || !credentials.confirm_password) {
            return toast.error('Please fill in all fields');
        }

        // check if password and confirm password match
        if (credentials.password !== credentials.confirm_password) {
            return toast.error('Passwords do not match');
        }

        registerUser({ ...credentials })
    }

    useEffect(() => {
        if (isAuthenticated && message) {
            toast.success(message);
            navigate({ to: '/' });
            useAuthStore.setState((state) => ({ ...state, message: null }));
        }

        if (!isAuthenticated && message) {
            toast.error(message);
            useAuthStore.setState((state) => ({ ...state, message: null }));
        }
    }, [isAuthenticated, message, navigate]);


    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-[2rem] items-center">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={credentials.name}
                onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                className="border-b-2 placeholder:text-center text-center"
            />

            <input
                type="text"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="border-b-2 placeholder:text-center text-center"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="border-b-2 placeholder:text-center text-center"
            />

            <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={credentials.confirm_password}
                onChange={(e) => setCredentials({ ...credentials, confirm_password: e.target.value })}
                className="border-b-2 placeholder:text-center text-center"
            />

            <button
                type="submit"
                disabled={isLoading}
                className="border-2 p-[0.5rem] rounded-md hover:bg-gray-200"
            >
                Register
            </button>
        </form>
    )
}

export default RegisterForm;