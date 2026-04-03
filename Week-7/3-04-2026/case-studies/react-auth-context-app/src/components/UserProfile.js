import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {user?.username || user?.name || user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserProfile;