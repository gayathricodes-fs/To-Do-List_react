import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidenav from "../Sidenav/Sidenav";
import Header from "../Header/Header";

import "./Layout.css";

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">

      <Sidenav
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">

        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;