import { Outlet } from "@tanstack/react-router"

const AdminLayout = () => {
    return (
        <div>
            <p>Admin Layout</p>

            <Outlet />
        </div>
    )
}

export default AdminLayout;