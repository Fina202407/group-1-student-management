import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAdmission = () => {
  // State variables to store admission details
  const [studentId, setStudentId] = useState(""); // ID of the student (should be a valid Student ID)
  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    // Prepare the admission data
    const admissionData = {
      Student: studentId ? parseInt(studentId, 10) : null,
      DateOfAdmission: dateOfAdmission,
      Status: status,
    };

    try {
      // Send POST request to create a new admission
      await axios.post("http://127.0.0.1:8000/api/auth/admissions/", admissionData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
      });

      alert("Admission added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding admission:", error.response?.data || error.message);
      alert("Failed to add admission. Please check your input or try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add Admission</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">Student ID:</label>
                <input
                  type="number"
                  id="studentId"
                  className="form-control"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfAdmission" className="form-label">Date of Admission:</label>
                <input
                  type="date"
                  id="dateOfAdmission"
                  className="form-control"
                  placeholder="Select Admission Date"
                  value={dateOfAdmission}
                  onChange={(e) => setDateOfAdmission(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status:</label>
                <select
                  id="status"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Add Admission</button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmission;
