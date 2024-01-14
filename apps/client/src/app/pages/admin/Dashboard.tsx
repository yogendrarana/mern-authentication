import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    // local states
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                const { data, status } = await axiosPrivate.get('/admin/users');

                if (status === 200 && isMounted) {
                    setUsers(data.data.users);
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                toast.error("Unauthorized");
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    navigate({ to: '/' });
                }
            }
        };

        getUsers();

        return () => {
            isMounted = false;
        };
    }, [navigate, axiosPrivate]);

    return (
        <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
            <p className=" text-[1rem]">Dashboard</p>

            <h3>Users</h3>
            <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {users && users.map((user: any) => (
                    <div key={user._id} className="flex flex-col items-center">
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
