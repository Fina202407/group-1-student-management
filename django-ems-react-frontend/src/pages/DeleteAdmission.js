import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteAdmission = () => {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  // Get the admission ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

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

    fetchAdmission();
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/auth/admissions/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      alert("Admission deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      setError("Error deleting admission.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Delete Admission</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="alert alert-warning">
        Are you sure you want to delete the admission for <strong>{admission.StudentName}</strong>?
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Yes, Delete
      </button>
      <button
        className="btn btn-secondary ms-3"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteAdmission;
