import { useLoaderData } from "@tanstack/react-router";


const Dashboard = () => {
    const data = useLoaderData({from: '/admin/'});

    return (
        <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
            <p className=" text-[1rem]">Dashboard</p>

            <h3>No of Users: {data?.no_of_users}</h3>
        </div>
    );
};

export default Dashboard;
