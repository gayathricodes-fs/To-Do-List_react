import React from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut, FiChevronDown,FiSettings 
} from "react-icons/fi";
import "./Header.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const user = localStorage.getItem("user");
    const userDetails =JSON.parse(atob(user))
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };
    const location = useLocation();
    const title = location.pathname
  .replace("/", "")
  .replace("-", " ")
  .replace(/\b\w/g, char => char.toUpperCase());
  return (
  
    <header className="header">

      <h1>{title}</h1>

      <div className="header-right">

        {/* Search */}
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search tasks..."
          />
        </div>

        {/* Notification */}
        <button className="header-icon">
          <FiBell />
        </button>

        {/* Profile */}
           <div className="user-container">

                        <button
                            className="user-button"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="user-icon">
                                <FiUser color="white"/>
                            </div>

                            <span className="user-name">
                               Hello! {userDetails?.name || "User"}
                            </span>

                            <FiChevronDown
                                className={showDropdown ? "arrow rotate" : "arrow"}
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