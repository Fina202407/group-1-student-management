import { useEffect, useState } from "react";

const MarksList = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch("/api/marks/")
      .then((response) => response.json())
      .then((data) => setMarks(data));
  }, []);

  return (
    <div>
      <h2>Student Marks</h2>
      <ul>
        {marks.map((mark) => (
          <li key={mark.id}>
            {mark.student} - {mark.subject}: {mark.marks_obtained} / {mark.total_marks} ({mark.percentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarksList;
