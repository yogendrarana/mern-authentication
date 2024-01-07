import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../../../store/useAuthStore";

const Navbar = () => {
    const { logoutUser } = useAuthStore();

    return (
        <div className="p-[1rem] flex justify-between border">
            <Link to="/" className="px-[0.25rem]">MERN JWT AUTH</Link>

            <div className="flex gap-[1rem]">
                <Link to="/profile" className="border px-[0.25rem]">Profile</Link>
                <Link to="/admin" className="border px-[0.25rem]">Admin</Link>
                <div className="mx-[1rem]"></div>
                <Link to="/login" className="border px-[0.25rem]">Login</Link>
                <Link to="/register" className="border px-[0.25rem]">Register</Link>
                <button onClick={() => logoutUser()} className="border px-[0.25rem] hover:bg-gray-200">Logout</button>
            </div>
        </div>
    )
}

export default Navbar;