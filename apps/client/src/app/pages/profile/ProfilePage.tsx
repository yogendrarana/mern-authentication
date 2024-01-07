import Navbar from "../../components/navbar/Navbar";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const { authUser } = useAuthStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentUser, setCurrentUser] = useState<any>({});

    useEffect(() => {
        if (authUser) {
            setCurrentUser(authUser);
        }
    }, [authUser]);

    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
                <div className="text-[2rem] mb-[3rem] text-center">
                    <h1>Profile Page</h1>

                    <p className=" text-[1rem]">Name: {currentUser.name!}</p>
                    <p className=" text-[1rem]">Email: {currentUser.email!}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;