import React, { useEffect, useState } from "react";
import axios from "axios";

const API =  `${process.env.REACT_APP_API_URL}/students`;

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", branch: "" });

  const [editingId, setEditingId] = useState(null);  // Track student being edited

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  const addStudent = async () => {
    await axios.post(API, form);
    setForm({ name: "", email: "", branch: "" });
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  const startEditing = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      email: student.email,
      branch: student.branch,
    });
  };

  const updateStudent = async () => {
    await axios.patch(`${API}/${editingId}`, form);
    setEditingId(null);
    setForm({ name: "", email: "", branch: "" });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Manager</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Branch"
        value={form.branch}
        onChange={(e) => setForm({ ...form, branch: e.target.value })}
      />

      {editingId ? (
        <button onClick={updateStudent}>Update Student</button>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}

      <hr />

      {students.map((s) => (
        <div key={s._id} style={{ padding: "5px" }}>
          {s.name} — {s.email} — {s.branch}
          
          <button onClick={() => startEditing(s)} style={{ marginLeft: "10px" }}>
            Edit
          </button>

          <button onClick={() => deleteStudent(s._id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
