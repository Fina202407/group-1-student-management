import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const [student, setStudent] = useState({
    Name: "",
    StudentId: "",
    // Add other student fields as necessary
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();  // Retrieve the student ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/auth/students/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setStudent(res.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching student data.");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/auth/students/${id}/`,
        student,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      setError("Error updating student data.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            value={student.Name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="StudentId" className="form-label">
            Student ID
          </label>
          <input
            type="text"
            className="form-control"
            id="StudentId"
            name="StudentId"
            value={student.StudentId}
            onChange={handleChange}
          />
        </div>

        {/* Add other student fields as necessary */}

        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
