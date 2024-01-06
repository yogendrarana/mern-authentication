import Navbar from "../../components/navbar/Navbar";

const ProfilePage = () => {
    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
                <div className="text-[2rem] mb-[3rem] text-center">
                    <h1>Profile Page</h1>

                    <p className=" text-[1rem]">Profile page is protected page which can only be accessed by logged in users</p>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage;