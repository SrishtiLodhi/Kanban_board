import React from "react";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="overlay">
      <div
        className="spinner-border"
        style={{ color: "var(--border)" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
