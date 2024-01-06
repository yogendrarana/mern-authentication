import { Link } from "@tanstack/react-router";

const Navbar = () => {
    return (
        <div className="p-[1rem] flex justify-between border">
            <h1>MERN JWT AUTH</h1>

            <div className="flex gap-[1rem]">
                <Link to="/" className="border px-[0.25rem]">Home</Link>
                <Link to="/login" className="border px-[0.25rem]">Login</Link>
                <Link to="/register" className="border px-[0.25rem]">Register</Link>
                <Link to="/profile" className="border px-[0.25rem]">Profile</Link>
                <Link to="/admin" className="border px-[0.25rem]">Admin</Link>
            </div>
        </div>
    )
}

export default Navbar;