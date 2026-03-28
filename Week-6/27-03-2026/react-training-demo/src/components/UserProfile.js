import React from "react";
import PropTypes from "prop-types";

function UserProfile({
  name,
  age,
  email,
  isActive = false,     // default value
  hobbies = [],         // prevents undefined.map error
  onEdit
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        maxWidth: "400px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "0.3s"
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "scale(1.03)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      <h2>{name}</h2>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {isActive ? "🟢 Active" : "🔴 Inactive"}
      </p>

      <div>
        <strong>Hobbies:</strong>
        <ul>
          {hobbies.length > 0 ? (
            hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))
          ) : (
            <li>No hobbies available</li> // fallback UI
          )}
        </ul>
      </div>

      <button
        onClick={onEdit}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Edit Profile
      </button>
    </div>
  );
}

// ✅ Prop validation
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  hobbies: PropTypes.arrayOf(PropTypes.string),
  onEdit: PropTypes.func.isRequired
};

export default UserProfile;