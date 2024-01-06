import { useAuthStore } from "../../../store/useAuthStore";
import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {

    const { isAuthenticated } = useAuthStore();
    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[2rem] flex flex-col items-center">
                <h1 className="mb-[5rem]">Welcome to Home Page</h1>

                <div className="flex flex-col items-center">
                    <p>Am I isAuthenticated?</p>
                    <h3>{isAuthenticated ? "Yes": "No"}</h3>
                </div>
            </div>

        </div>
    )
}

export default HomePage;