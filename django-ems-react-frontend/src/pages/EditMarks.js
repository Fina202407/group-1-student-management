import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMark = () => {
  const { id } = useParams(); // Get the mark ID from the URL
  const navigate = useNavigate();
  const [markData, setMarkData] = useState({
    Student: "",      // This might be an ID or a string (depending on your serializer)
    SubjectName: "",  // Use SubjectName as expected by backend
    TotalMarks: "",   // Use TotalMarks as expected by backend
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch the existing mark details from the correct endpoint prefix (/api/auth/marks/)
    const fetchMark = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/auth/marks/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setMarkData({
          Student: res.data.Student,            // Assuming the API returns a student ID or name here
          SubjectName: res.data.SubjectName,
          TotalMarks: res.data.TotalMarks,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching mark details.");
        setLoading(false);
      }
    };

    fetchMark();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Send the PUT request to update the mark at the correct endpoint (/api/auth/marks/)
      await axios.put(`http://127.0.0.1:8000/api/auth/marks/${id}/`, markData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      alert("Mark updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError("Error updating mark.");
      console.error("Error updating mark:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Mark</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student</label>
          <input
            type="text"
            className="form-control"
            name="Student"
            value={markData.Student}
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject Name</label>
          <input
            type="text"
            className="form-control"
            name="SubjectName"
            value={markData.SubjectName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Marks</label>
          <input
            type="number"
            className="form-control"
            name="TotalMarks"
            value={markData.TotalMarks}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Mark
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditMark;
