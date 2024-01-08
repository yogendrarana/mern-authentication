import React from "react";
import { Link, Outlet } from "@tanstack/react-router";

// import components
import Navbar from "../../components/navbar/Navbar";

const ProfileLayout: React.FC = () => {
    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[1rem] flex items-center gap-[1rem]">
                <Link to="/profile" className="border px-[0.25rem] font-bold">Profile</Link>
                <Link to="/profile/settings" className="border px-[0.25rem] font-bold">Settings</Link>
            </div>

            <Outlet />
        </div>
    )
}

export default ProfileLayout;