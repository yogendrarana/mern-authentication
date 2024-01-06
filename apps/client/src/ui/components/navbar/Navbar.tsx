import { Link } from "@tanstack/react-router";

const Navbar = () => {
    return (
        <div className="p-[1rem] flex justify-between border">
            <h1>MERN JWT AUTH</h1>

            <div className="flex gap-[1rem]">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Navbar;