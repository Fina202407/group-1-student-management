import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteStudent = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();  // Get the student ID from the URL
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/auth/students/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Error deleting student.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Delete Student</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="alert alert-warning">
        <p>Are you sure you want to delete the student <strong>{student.Name}</strong>?</p>
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Student
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteStudent;
