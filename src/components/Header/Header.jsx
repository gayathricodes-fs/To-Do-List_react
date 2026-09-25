import React, { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiSettings,
  FiMenu
} from "react-icons/fi";
import "../Header/Header";

import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

  const user = localStorage.getItem("user");
  const userDetails = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/important": "Important",
    "/profile": "My Profile",
    "/settings": "Settings"
  };

  const title = pageTitles[location.pathname] || "TaskPilot";

  return (
    <header className="header">

      {/* Left section */}
      <div className="header-left">

        {/* Mobile menu */}
        <button
          className="mobile-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        <h1>{title}</h1>

      </div>


      {/* Right section */}
      <div className="header-right">

        {/* Notification */}
        <button
          className="header-icon"
          aria-label="Notifications"
        >
          <FiBell />
        </button>


        {/* Profile */}
        <div className="user-container">

          <button
            className="user-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >

            <div className="user-icon">
              <FiUser color="white" />
            </div>

            <span className="user-name">
              Hello! {userDetails?.name || "User"}
            </span>

            <FiChevronDown
              className={
                showDropdown
                  ? "arrow rotate"
                  : "arrow"
              }
            />

          </button>


          {showDropdown && (
            <div className="user-dropdown">

              <button
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                <FiUser />
                <span>My Profile</span>
              </button>


              <button
                className="dropdown-item"
                onClick={() => navigate("/settings")}
              >
                <FiSettings />
                <span>Settings</span>
              </button>


              <div className="dropdown-divider"></div>


              <button
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default Header;