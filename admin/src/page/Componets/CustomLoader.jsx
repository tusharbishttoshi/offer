import React from 'react';

export default function CustomLoader({ Loder }) {
  return (
    // Conditional rendering: Display loader only if loader prop is true
    Loder && (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div
          className="spinner-border text-warning"
          role="status"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  );
}
