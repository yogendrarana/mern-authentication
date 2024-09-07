import Navbar from "../../components/navbar/Navbar";
import { useAuthStore } from "../../../store/useAuthStore";

// components
import Posts from "../../components/posts/Posts";

const HomePage = () => {
    const { isAuthenticated, accessToken } = useAuthStore();
    const accessTokenArray = accessToken?.split(".");

    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[2rem] flex flex-col items-center">
                <h1 className="mb-[5rem] font-bold">Welcome</h1>

                <div className="flex flex-col gap-[2rem] items-center">
                    <div>
                        <h2>Is Authenticated?</h2>
                        <p className="text-center font-bold">{isAuthenticated ? "Yes" : "No"}</p>
                    </div>

                    <div>
                        <h2 className="text-center">Access Token</h2>
                        <div className="font-bold">
                            {
                                !accessToken ? "No Access Token" : (<div className="text-center font-bold">{accessTokenArray?.map((token) => (<p key={token}>{token}</p>))}</div>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Posts />
        </div>
    )
}

export default HomePage;