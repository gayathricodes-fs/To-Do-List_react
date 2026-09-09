import React from "react";
import {
  FiHome,
  FiList,
  FiCalendar,
  FiStar,
  FiUser,
  FiChevronDown
} from "react-icons/fi";
import "../Sidenav/Sidenav.css";
import { NavLink } from "react-router-dom";
const SideNav = () => {
 const user = localStorage.getItem("user");

const userDetails = user ? JSON.parse(user) : null;


 const menuItems = [
  { id: 1, label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { id: 2, label: "Tasks", icon: <FiList />, path: "/tasks" },
  { id: 3, label: "Calendar", icon: <FiCalendar />, path: "/calendar" },
  { id: 4, label: "Important", icon: <FiStar />, path: "/important" }
];
  return (
   <aside className="side-nav">

  {/* Logo */}
  <div className="logo-section">
    <div className="logo-icon">
      <img
        src="/logo-update-removebg-preview.png"
        alt="Logo"
      />
    </div>
  </div>

  {/* Scrollable Content */}
  <div className="side-nav-content">

    {/* Navigation */}
    <nav className="navigation">
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>

    {/* Categories */}
    <div className="category-section">

      <h4>Categories</h4>

      <div className="category-item">
        <span className="category-dot work"></span>
        <span>Work</span>
      </div>

      <div className="category-item">
        <span className="category-dot personal"></span>
        <span>Personal</span>
      </div>

      <div className="category-item">
        <span className="category-dot study"></span>
        <span>Study</span>
      </div>

      <div className="category-item">
        <span className="category-dot shopping"></span>
        <span>Shopping</span>
      </div>
    </div>
  </div>

  {/* User */}
  <div className="user-section">

    <div className="user-icon">
      <FiUser color="white" />
    </div>

    <span className="user-name">{userDetails?.name || "User"}</span>

    <FiChevronDown className="user-arrow" />

  </div>

</aside>
  );
};

export default SideNav;