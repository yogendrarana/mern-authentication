import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const ProfileDetails = () => {
    const { authUser } = useAuthStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentUser, setCurrentUser] = useState<any>({});

    useEffect(() => {
        if (authUser) {
            setCurrentUser(authUser);
        }
    }, [authUser]);

    return (
        <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
            <p className=" text-[1rem]">Name: {currentUser.name!}</p>
            <p className=" text-[1rem]">Email: {currentUser.email!}</p>
        </div>
    )
}

export default ProfileDetails;