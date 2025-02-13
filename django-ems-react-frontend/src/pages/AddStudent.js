import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  // State variables to store student details
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState(""); // Keep it as an empty string initially
  const [admissionId, setAdmissionId] = useState("");

  const navigate = useNavigate();

  // Handle form submission to send student data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    // Parse department as an integer (or null if empty)
    const parsedDepartment = department ? parseInt(department, 10) : null;
    console.log("Parsed Department:", parsedDepartment);  // Debugging line

    // Prepare the data to send (AdmissionId is optional)
    const studentData = {
      Name: name,
      Age: age ? parseInt(age, 10) : null,
      Department: parsedDepartment, // Only add department if valid
    };

    // If AdmissionId is provided, include it
    if (admissionId) {
      studentData.AdmissionId = admissionId ? parseInt(admissionId, 10) : null;
    }

    console.log("Student data:", studentData);  // Debugging line

    try {
      // Send the POST request to add a new student
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/students/",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },
        }
      );

      // If AdmissionId was provided, update it after student creation
      if (admissionId && response.data.StudentId) {
        const studentId = response.data.StudentId;
        await axios.patch(
          `http://127.0.0.1:8000/api/auth/students/${studentId}/`,
          { AdmissionId: admissionId },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`,
            },
          }
        );
      }

      alert("Student added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding student:", error.response?.data || error.message);
      alert("Failed to add student. Please check your input or try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Department ID"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Admission ID (Optional)"
                  value={admissionId}
                  onChange={(e) => setAdmissionId(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Add Student
              </button>
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

export default AddStudent;
