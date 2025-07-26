// App.js
import React, { useState } from "react";
import Card from "./Card";
import "./index.css";

const initialForm = {
  fullName: "",
  email: "",
  iitName: "",
  sport: "",
  mobile: ""
};

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.email ||
      !form.iitName ||
      !form.sport ||
      !form.mobile
    ) {
      alert("Please fill all fields!");
      return;
    }

    if (editingId === null) {
      // Create
      setStudents([
        ...students,
        {
          ...form,
          id: Date.now() + Math.random()
        }
      ]);
    } else {
      // Update
      setStudents(
        students.map(s =>
          s.id === editingId ? { ...form, id: editingId } : s
        )
      );
    }
    setForm(initialForm);
    setEditingId(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this entry?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  }

  function handleEdit(id) {
    const student = students.find(s => s.id === id);
    setForm({
      fullName: student.fullName,
      email: student.email,
      iitName: student.iitName,
      sport: student.sport,
      mobile: student.mobile
    });
    setEditingId(id);
  }

  function handleCancel() {
    setForm(initialForm);
    setEditingId(null);
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <pre className="navbar-title">🏆 Inter IITM Sports Meet 2025</pre>
        <div className="navbar-links">
          <a>Home</a>
          <a>Register</a>
        </div>
      </nav>

      {/* Main container */}
      <div className="container">
        {/* Form Section */}
        <div className="form-section">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Registration Form</h2>

            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="iitName">IIT Name</label>
              <input
                id="iitName"
                type="text"
                name="iitName"
                value={form.iitName}
                onChange={handleChange}
                required
                placeholder="Enter your IIT name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="sport">Sport</label>
              <input
                id="sport"
                type="text"
                name="sport"
                value={form.sport}
                onChange={handleChange}
                required
                placeholder="Enter the sport"
              />
            </div>

            <div className="form-field">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="10-digit number"
              />
            </div>

            <div className="form-actions">
              {editingId !== null && (
                <button
                  type="button"
                  className="button button-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className={`button ${
                  editingId === null ? "button-submit" : "button-edit"
                }`}
              >
                {editingId === null ? "Register" : "Update"}
              </button>
            </div>
          </form>
        </div>

        {/* Cards Section */}
        <div className="cards-section">
          <h2 className="participants-title">Registered Participants</h2>
          {students.length === 0 ? (
            <p>No registrations yet.</p>
          ) : (
            <div className="cards-grid">
              {students
                .slice()
                .reverse()
                .map(student => (
                  <Card
                    key={student.id}
                    student={student}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
