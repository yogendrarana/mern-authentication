import { Link } from "@tanstack/react-router";

const HomePage = () => {
    return (
        <div>
            <h1>MERN JWT AUTH</h1>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default HomePage;