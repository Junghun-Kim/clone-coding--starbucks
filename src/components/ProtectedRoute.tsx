import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../Firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode; }) {
    const user = auth.currentUser;
    console.log(user);

    if (user === null) {
        return <Navigate to='/login' />;
    }

    return children;
}