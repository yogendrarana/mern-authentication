import { useLoaderData } from "@tanstack/react-router";

const ProfileDetails = () => {
    const data: { name: string, email: string } = useLoaderData({ from: '/profile/' })

    return (
        <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
            <p className=" text-[1rem]">Name: {data.name!}</p>
            <p className=" text-[1rem]">Email: {data.email!}</p>
        </div>
    )
}

export default ProfileDetails;