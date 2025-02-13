// Import Bootstrap CSS globally
import "bootstrap/dist/css/bootstrap.min.css";

// Import necessary libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components from pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import DeleteStudent from "./pages/DeleteStudent";
import AddDepartment from "./pages/AddDepartment";
import EditDepartment from "./pages/EditDepartment";
import DeleteDepartment from "./pages/DeleteDepartment";
import AddMarks from "./pages/AddMarks";
import EditMarks from "./pages/EditMarks";
import DeleteMarks from "./pages/DeleteMarks";
import AddAdmission from "./pages/AddAdmission";
import EditAdmission from "./pages/EditAdmission";
import DeleteAdmission from "./pages/DeleteAdmission";
import ProtectedRoute from "./components/ProtectedRoute.js";

// Define routes
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={< Signup/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Student Routes */}
        <Route path="/add-student" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path="/edit-student/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
        <Route path="/delete-student/:id" element={<ProtectedRoute><DeleteStudent /></ProtectedRoute>} />

        {/* Department Routes */}
        <Route path="/add-department" element={<ProtectedRoute><AddDepartment /></ProtectedRoute>} />
        <Route path="/edit-department/:id" element={<ProtectedRoute><EditDepartment /></ProtectedRoute>} />
        <Route path="/delete-department/:id" element={<ProtectedRoute><DeleteDepartment /></ProtectedRoute>} />

        {/* Marks Routes */}
        <Route path="/add-marks" element={<ProtectedRoute><AddMarks /></ProtectedRoute>} />
        <Route path="/edit-marks/:id" element={<ProtectedRoute><EditMarks /></ProtectedRoute>} />
        <Route path="/delete-marks/:id" element={<ProtectedRoute><DeleteMarks /></ProtectedRoute>} />

        {/* Admission Routes */}
        <Route path="/add-admission" element={<ProtectedRoute><AddAdmission /></ProtectedRoute>} />
        <Route path="/edit-admission/:id" element={<ProtectedRoute><EditAdmission /></ProtectedRoute>} />
        <Route path="/delete-admission/:id" element={<ProtectedRoute><DeleteAdmission /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

// Export the App component
export default App;
