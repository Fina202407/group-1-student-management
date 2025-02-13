import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteMark = () => {
  const { id } = useParams(); // Get mark ID from URL
  const navigate = useNavigate();
  const [markData, setMarkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      navigate("/login");
      return;
    }

    // Fetch mark details
    const fetchMark = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/auth/marks/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setMarkData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.detail || "Error fetching mark details.");
        setLoading(false);
      }
    };

    fetchMark();
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/auth/marks/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      alert("Mark deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.detail || "Error deleting mark.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Delete Mark</h2>

      <p>Are you sure you want to delete the following mark?</p>

      <div className="card p-3">
        <p><strong>Student:</strong> {markData.Student}</p>         
        <p><strong>Subject:</strong> {markData.SubjectName}</p>     
        <p><strong>Marks:</strong> {markData.TotalMarks}</p>        
      </div>

      <button onClick={handleDelete} className="btn btn-danger mt-3">
        Delete
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="btn btn-secondary mt-3 ms-3"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteMark;
