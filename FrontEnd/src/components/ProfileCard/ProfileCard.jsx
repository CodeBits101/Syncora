import React, { useState } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold profile data
  const [profileData, setProfileData] = useState({
    phoneNumber: "93016–93705",
    managerName: "Lionel Messi",
    designation: "Developer",
    joiningDate: "01-01-2001"
  });

  // Handler for input changes
  const handleChange = (field, value) => {
    setProfileData(prevData => ({ ...prevData, [field]: value }));
  };

  // Handler for toggling edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-wrapper">
      <header className="header">
        <div>
          <h2>Welcome, John</h2>
          <p>{formattedDate}</p>
        </div>
        <img
          className="avatarSmall"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User avatar"
        />
      </header>

      <div className="card">
        <div className="banner" />
        <div className="profileSection">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="John Doe"
          />
          <div>
            <h3>John Doe</h3>
            <p>johndoe@gmail.com</p>
          </div>
          <a className="changePassword" href="#">
            Change Password
          </a>
        </div>

        <div className="infoTable">
          <div className="column">
            <div className="inputGroup">
              <label>Phone Number</label>
              <input
                value={profileData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                readOnly={!isEditing}
              />
            </div>
            <div className="inputGroup">
              <label>Manager Name</label>
              <input
                value={profileData.managerName}
                onChange={(e) => handleChange("managerName", e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="column">
            <div className="inputGroup">
              <label>Designation</label>
              <input
                value={profileData.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                readOnly={!isEditing}
              />
            </div>
            <div className="inputGroup">
              <label>Joining Date</label>
              <input
                value={profileData.joiningDate}
                onChange={(e) => handleChange("joiningDate", e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Edit/Save Button */}
        <div style={{ textAlign: "right", padding: "1rem" }}>
          <button onClick={toggleEdit} className="editButton">
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
