// Import required packages
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMarks = () => {
    // Initialize state variables to store student marks details
    const [studentID, setStudentID] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");

    // Initialize navigate function to redirect users
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            // Get the token from local storage
            const token = localStorage.getItem("token");

            if (!token) {
                alert("You are not logged in!");
                navigate("/login");
                return;
            }

            // Send a POST request to the Add Marks API
            await axios.post(
                "http://localhost:8000/api/auth/marks/",
                {
                    Student: studentID,       
                    SubjectName: subject,    
                    TotalMarks: marks        
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`, 
                    },
                }
            );

            alert("Marks added successfully");
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Failed to add marks");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Add Marks</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Student ID"
                                    value={studentID}
                                    onChange={(e) => setStudentID(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                    placeholder="Marks"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary w-100" type="submit">
                                Add Marks
                            </button>
                            <button
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

export default AddMarks;
