// Import necessary packages
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    // Check if the user is authenticated
    if (!token) {
        return <Navigate to="/" replace />; // Redirect to login page if not authenticated
    }

    return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
