// import { useEffect, useState } from "react";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { useNavigate } from "@tanstack/react-router";

const Dashboard = () => {
    // const navigate = useNavigate();
    // const axiosPrivate = useAxiosPrivate();

    // // local states
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     let isMounted = true;

    //     const getUsers = async () => {
    //         try {
    //             const { data, status } = await axiosPrivate.get('/admin/users');

    //             if (status === 200 && isMounted) {
    //                 setUsers(data.data.users);
    //             }

    //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         } catch (err: any) {
    //             if (err.response && (err.response.status === 401 || err.response.status === 403)) {
    //                 navigate({ to: '/' });
    //             }
    //         }
    //     };

    //     getUsers();

    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);

    return (
        <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
            <p className=" text-[1rem]">Users List</p>
        </div>
    );
};

export default Dashboard;
