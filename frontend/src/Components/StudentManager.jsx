import React, { useEffect, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/students`;

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", branch: "" });
  const [editingId, setEditingId] = useState(null);

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
    <div className="container">
      {/* Internal CSS */}
      <style>
        {`
        .container {
          max-width: 700px;
          margin: 40px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .form-box {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        .btn {
          padding: 10px 18px;
          margin-top: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        }

        .btn-add {
          background: #28a745;
          color: white;
        }

        .btn-update {
          background: #007bff;
          color: white;
        }

        .student-card {
          background: #fafafa;
          padding: 15px;
          border-radius: 8px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .student-info {
          font-size: 15px;
          color: #333;
        }

        .action-btn {
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 8px;
          font-weight: bold;
        }

        .edit-btn {
          background: #ffc107;
          color: #000;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }
      `}
      </style>

      <h2>Student Manager</h2>

      {/* Form Box */}
      <div className="form-box">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input"
          placeholder="Branch"
          value={form.branch}
          onChange={(e) => setForm({ ...form, branch: e.target.value })}
        />

        {editingId ? (
          <button className="btn btn-update" onClick={updateStudent}>
            Update Student
          </button>
        ) : (
          <button className="btn btn-add" onClick={addStudent}>
            Add Student
          </button>
        )}
      </div>

      {/* Student List */}
      {students.map((s) => (
        <div className="student-card" key={s._id}>
          <div className="student-info">
            <b>{s.name}</b> — {s.email} — {s.branch}
          </div>

          <div>
            <button className="action-btn edit-btn" onClick={() => startEditing(s)}>
              Edit
            </button>

            <button className="action-btn delete-btn" onClick={() => deleteStudent(s._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
