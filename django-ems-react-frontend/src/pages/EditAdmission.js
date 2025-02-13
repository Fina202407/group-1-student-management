import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAdmission = () => {
  const [admission, setAdmission] = useState({
    DateOfAdmission: "",
    Status: "",
    Student: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const { id } = useParams();  // Get the admission ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch students for the dropdown
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/auth/students/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setStudents(res.data);
      } catch (error) {
        setError("Error fetching students.");
      }
    };

    // Fetch the admission details by ID
    const fetchAdmission = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/auth/admissions/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAdmission(res.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching admission data.");
        setLoading(false);
      }
    };

    fetchStudents();
    fetchAdmission();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/auth/admissions/${id}/`,
        {
          DateOfAdmission: admission.DateOfAdmission,
          Status: admission.Status,
          Student: admission.Student,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert("Admission updated successfully");
      navigate("/dashboard");
    } catch (error) {
      setError("Error updating admission.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Admission</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student</label>
          <select
            className="form-select"
            value={admission.Student}
            onChange={(e) => setAdmission({ ...admission, Student: e.target.value })}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.StudentId} value={student.StudentId}>
                {student.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Admission</label>
          <input
            type="date"
            className="form-control"
            value={admission.DateOfAdmission}
            onChange={(e) => setAdmission({ ...admission, DateOfAdmission: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={admission.Status}
            onChange={(e) => setAdmission({ ...admission, Status: e.target.value })}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Save Changes
        </button>
      </form>

      <button
        className="btn btn-secondary w-100 mt-3"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditAdmission;
