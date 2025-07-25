import React, { useState } from "react";
import "./ProfileCard.css";
import PasswordChangeModal from "./PasswordChangeModal";

const ProfileCard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const [role] = useState("EMPLOYEE"); 

  // Edit mode toggle
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // modal state
  const [profileErrors, setProfileErrors] = useState({});

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phoneNumber: "93016–93705",
    managerName: "Lionel Messi",
    designation: "Developer",
    joiningDate: "01-01-2001"
  });

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const validateProfile = () => {
    const errors = {};
    // Name
    if (!profileData.name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(profileData.name.trim())) {
      errors.name = 'Only letters and spaces allowed.';
    } else if (profileData.name.trim().length > 50) {
      errors.name = 'Maximum 50 characters allowed.';
    }
    // Email
    if (!profileData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(profileData.email.trim())) {
      errors.email = 'Invalid email format.';
    }
    // Phone Number
    if (!profileData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10,15}$/.test(profileData.phoneNumber.trim().replace(/\D/g, ''))) {
      errors.phoneNumber = 'Phone number must be 10-15 digits.';
    }
    // Manager Name
    if (!profileData.managerName.trim()) {
      errors.managerName = 'Manager name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(profileData.managerName.trim())) {
      errors.managerName = 'Only letters and spaces allowed.';
    } else if (profileData.managerName.trim().length > 50) {
      errors.managerName = 'Maximum 50 characters allowed.';
    }
    // Designation
    if (!profileData.designation.trim()) {
      errors.designation = 'Designation is required.';
    } else if (profileData.designation.trim().length > 30) {
      errors.designation = 'Maximum 30 characters allowed.';
    }
    // Joining Date
    if (!profileData.joiningDate.trim()) {
      errors.joiningDate = 'Joining date is required.';
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(profileData.joiningDate.trim())) {
      errors.joiningDate = 'Date must be in DD-MM-YYYY format.';
    } else {
      const [d, m, y] = profileData.joiningDate.trim().split('-').map(Number);
      const date = new Date(y, m - 1, d);
      if (
        date.getFullYear() !== y ||
        date.getMonth() !== m - 1 ||
        date.getDate() !== d
      ) {
        errors.joiningDate = 'Invalid date.';
      }
    }
    return errors;
  };

  const handleSave = () => {
    const errors = validateProfile();
    setProfileErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsEditing(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const openPasswordModal = () => setShowPasswordModal(true);
  const closePasswordModal = () => setShowPasswordModal(false);

  const isFieldEditable = (field) => {
    if (role === "ADMIN") return isEditing;
    if (role === "EMPLOYEE" && field === "phoneNumber") return isEditing;
    return false;
  };

  const quotes = [
    "Success is not the key to happiness. Happiness is the key to success.",
    "The only way to do great work is to love what you do.",
    "Productivity is never an accident. It is always the result of a commitment to excellence.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "Great things never come from comfort zones.",
    "Dream big. Start small. Act now.",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Success doesn’t just find you. You have to go out and get it."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="profile-wrapper" style={{ overflowX: "hidden" }}>
      <header className="header">
        <div>
          <h2>Welcome, {profileData.name.split(" ")[0]}</h2>
          <div className="date-text">{formattedDate}</div>
        </div>
        <div className="quote-text">{randomQuote}</div>
      </header>

      <div className="card">
        <div className="banner" />
        <div className="profileSection">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt={profileData.name}
          />
          <div>
            <h3>{profileData.name}</h3>
            <p>{profileData.email}</p>
          </div>

          {role === "EMPLOYEE" && 
          (<a className="changePassword" onClick={openPasswordModal} href="#">
            Change Password
          </a>)}

        </div>

        <div className="infoTable">
          <div className="column">
            <div className="inputGroup">
              <label>Name</label>
              <input
                value={profileData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                readOnly={!isFieldEditable("name")}
              />
              {profileErrors.name && <div className="error-text">{profileErrors.name}</div>}
            </div>
            <div className="inputGroup">
              <label>Email</label>
              <input
                value={profileData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                readOnly={!isFieldEditable("email")}
              />
              {profileErrors.email && <div className="error-text">{profileErrors.email}</div>}
            </div>
            <div className="inputGroup">
              <label>Phone Number</label>
              <input
                value={profileData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                readOnly={!isFieldEditable("phoneNumber")}
              />
              {profileErrors.phoneNumber && <div className="error-text">{profileErrors.phoneNumber}</div>}
            </div>
          </div>

          <div className="column">
            <div className="inputGroup">
              <label>Manager Name</label>
              <input
                value={profileData.managerName}
                onChange={(e) => handleChange("managerName", e.target.value)}
                readOnly={!isFieldEditable("managerName")}
              />
              {profileErrors.managerName && <div className="error-text">{profileErrors.managerName}</div>}
            </div>
            <div className="inputGroup">
              <label>Designation</label>
              <input
                value={profileData.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                readOnly={!isFieldEditable("designation")}
              />
              {profileErrors.designation && <div className="error-text">{profileErrors.designation}</div>}
            </div>
            <div className="inputGroup">
              <label>Joining Date</label>
              <input
                value={profileData.joiningDate}
                onChange={(e) => handleChange("joiningDate", e.target.value)}
                readOnly={!isFieldEditable("joiningDate")}
              />
              {profileErrors.joiningDate && <div className="error-text">{profileErrors.joiningDate}</div>}
            </div>
          </div>
        </div>

        {/* Edit/Save button only for allowed roles */}
        {(role === "ADMIN" || role === "EMPLOYEE") && (
          <div style={{ textAlign: "right", padding: "1rem" }}>
            <button onClick={toggleEdit} className="editButton">
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        )}
      </div>

      <PasswordChangeModal open={showPasswordModal} onClose={closePasswordModal} />
    </div>
  );
};

export default ProfileCard;
