import React from "react";

const Card = ({ student, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h3 className="card-title">{student.fullName}</h3>
      <p><b>Email:</b> {student.email}</p>
      <p><b>IIT Name:</b> {student.iitName}</p>
      <p><b>Sport:</b> {student.sport}</p>
      <p><b>Mobile:</b> {student.mobile}</p>
      <div className="card-actions">
        <button
          className="button button-edit"
          onClick={() => onEdit(student.id)}
        >Edit</button>
        <button
          className="button button-delete"
          onClick={() => onDelete(student.id)}
        >Delete</button>
      </div>
    </div>
  );
};

export default Card;
