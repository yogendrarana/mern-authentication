import { Outlet } from "@tanstack/react-router"

const AdminLayout = () => {

    return (
        <div>
            <h1 className="font-bold">Admin Layout</h1>

            <Outlet />
        </div>
    )
}

export default AdminLayout;