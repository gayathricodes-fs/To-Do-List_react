import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../Sidenav/Sidenav";
import Header from "../Header/Header";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-layout">

      {/* Side Navigation */}
      <SideNav />

      {/* Main Area */}
      <div className="main-area">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;