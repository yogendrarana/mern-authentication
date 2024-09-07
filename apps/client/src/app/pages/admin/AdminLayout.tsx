import Navbar from "../../components/navbar/Navbar";
import { Link, Outlet } from "@tanstack/react-router";

const AdminLayout = () => {

    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[1rem] flex items-center gap-[1rem]">
                <Link to="/admin" className="border px-[0.25rem] font-bold">Dashboard</Link>
                <Link to="/admin/users" className="border px-[0.25rem] font-bold">Users</Link>
            </div>

            <Outlet />
        </div>
    )
}

export default AdminLayout;