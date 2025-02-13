import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  
  const [activeSection, setActiveSection] = useState(null); // Track which section is open
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const studentRes = await axios.get("http://127.0.0.1:8000/api/auth/students/", {
          headers: { Authorization: `Token ${token}` },
        });
        const marksRes = await axios.get("http://127.0.0.1:8000/api/auth/marks/", {
          headers: { Authorization: `Token ${token}` },
        });
        const admissionsRes = await axios.get("http://127.0.0.1:8000/api/auth/admissions/", {
          headers: { Authorization: `Token ${token}` },
        });

        setStudents(studentRes.data);
        setMarks(marksRes.data);
        setAdmissions(admissionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        alert("Failed to load data. Check API connection.");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="container mt-4"
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/1459373176/vector…20&c=P6D1VrXeeKsJfyKzlJeIqxyNXkeYtMb6C1mW6p68xro=')", // Add your image URL here
        backgroundSize: "cover", // Makes the background cover the entire screen
        backgroundPosition: "center", // Centers the image
        minHeight: "100vh", // Ensures the background covers the full height of the screen
        padding: "20px", // Adds some padding
         // Ensure text is visible against dark backgrounds
      }}
    >
      <h2 className="text-center mb-4">Student Management System</h2>

      {/* Three Main Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary w-25" onClick={() => setActiveSection(activeSection === "students" ? null : "students")}>
          Students
        </button>
        <button className="btn btn-success w-25" onClick={() => setActiveSection(activeSection === "marks" ? null : "marks")}>
          Marks
        </button>
        <button className="btn btn-warning w-25" onClick={() => setActiveSection(activeSection === "admissions" ? null : "admissions")}>
          Admissions
        </button>
      </div>

      {/* Student List Section */}
      {activeSection === "students" && (
        <div className="card p-3 mb-4 bg-light">
          <h3>Student List:</h3>
          <button className="btn btn-secondary w-25 mt-2" onClick={() => navigate("/add-student")}>
            Add Student
          </button>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.StudentId}>
                  <td>{student.Name}</td>
                  <td>{student.StudentId}</td>
                  <td>
                    <Link className="btn btn-primary btn-sm me-2" to={`/edit-student/${student.StudentId}`}>
                      Edit
                    </Link>
                    <Link className="btn btn-danger btn-sm" to={`/delete-student/${student.StudentId}`}>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Marks List Section */}
      {activeSection === "marks" && (
        <div className="card p-3 mb-4 bg-light">
          <h3>Marks List:</h3>
          <button className="btn btn-secondary w-25 mt-2" onClick={() => navigate("/add-marks")}>
            Add Marks
          </button>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Marks ID</th>
                <th>Student</th>
                <th>Subject Name</th>
                <th>Total Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr key={mark.MarksId}>
                  <td>{mark.MarksId}</td>
                  <td>{mark.Student}</td>
                  <td>{mark.SubjectName}</td>
                  <td>{mark.TotalMarks}</td>
                  <td>
                    <Link className="btn btn-primary btn-sm me-2" to={`/edit-marks/${mark.MarksId}`}>
                      Edit
                    </Link>
                    <Link className="btn btn-danger btn-sm" to={`/delete-marks/${mark.MarksId}`}>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admissions List Section */}
      {activeSection === "admissions" && (
        <div className="card p-3 mb-4 bg-light">
          <h3>Admission List:</h3>
          <button className="btn btn-secondary w-25 mt-2" onClick={() => navigate("/add-admission")}>
            Add Admission
          </button>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Admission ID</th>
                <th>Student</th>
                <th>Admission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((admission) => (
                <tr key={admission.AdmissionId}>
                  <td>{admission.AdmissionId}</td>
                  <td>{admission.Student}</td>
                  <td>{admission.DateOfAdmission}</td>
                  <td>{admission.Status}</td>
                  <td>
                    <Link className="btn btn-primary btn-sm me-2" to={`/edit-admission/${admission.AdmissionId}`}>
                      Edit
                    </Link>
                    <Link className="btn btn-danger btn-sm" to={`/delete-admission/${admission.AdmissionId}`}>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
