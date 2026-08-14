import React from "react";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Left - Logo */}
      <div className="footer-logo">
        <FiCheckSquare className="footer-logo-icon" />
        <span>
          Todo<span className="logo-highlight">List</span>
        </span>
      </div>

      {/* Center - Copyright */}
      <div className="footer-copyright">
        © 2026 TodoList. All rights reserved.
      </div>

      {/* Right - Social Icons */}
      <div className="footer-social">

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>

      </div>

    </footer>
  );
}

export default Footer;