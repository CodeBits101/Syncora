import React from "react";
import "./ProfileCard.css";
import { FaPen } from "react-icons/fa";

const ProfileCard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

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
              <div className="inputWithIcon">
                <input value="93016–93705" readOnly />
                <FaPen className="icon" />
              </div>
            </div>
            <div className="inputGroup">
              <label>Manager Name</label>
              <input value="Lionel Messi" readOnly />
            </div>
          </div>

          <div className="column">
            <div className="inputGroup">
              <label>Designation</label>
              <input value="Developer" readOnly />
            </div>
            <div className="inputGroup">
              <label>Joining Date</label>
              <input value="01-01-2001" readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
