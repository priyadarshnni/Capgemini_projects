import React from "react";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!isAuthenticated) return <p>You must be logged in to view this page.</p>;

    return children;
}

export default ProtectedRoute;