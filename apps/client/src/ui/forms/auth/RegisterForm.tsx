import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // zustand store
    const { registerUser, isLoading } = useAuthStore.getState();


    // login handler
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerUser({email, password})
    }


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
                Register
            </button>
        </form>
    )
}

export default RegisterForm;