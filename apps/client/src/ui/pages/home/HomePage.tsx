import { useAuthStore } from "../../../store/useAuthStore";
import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {
    const { isAuthenticated, accessToken } = useAuthStore();

    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[2rem] flex flex-col items-center">
                <h1 className="mb-[5rem]">Welcome to Home Page</h1>

                <div className="flex flex-col items-center">
                    <p>Authenticated: {isAuthenticated ? "Yes": "No"}</p>
                    <h3>Access Token: {accessToken ? accessToken.slice(0, 25) + "..." : "No access token"}</h3>
                </div>
            </div>

        </div>
    )
}

export default HomePage;