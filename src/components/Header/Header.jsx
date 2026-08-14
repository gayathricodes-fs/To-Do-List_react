import './Header.css'
import { FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {

    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const user = localStorage.getItem("user");
    const userDetails =JSON.parse(atob(user))
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <>
            <div className='container-fluid'>
                <header className="header">
                    <div className="logo">
                        <img src="/logo-update-removebg-preview.png" alt="" />
                        
                    </div>

                    <nav className='nav-items'>
                        <div className='menu'><FiHome className="menu-icon" size={20} color="white" /><a href="#" > Home</a></div>
                        <div className='menu'><FiList className="menu-icon" size={20} /> <a href="#">Tasks</a></div>
                        <div className='menu'><FiBarChart2 className="menu-icon" size={20} /> <a href="#">Stats</a></div>
                        <div className='menu'><FiInfo className="menu-icon" size={20} /> <a href="#">About</a></div>
                    </nav>

                    <div className="user-container">

                        <button
                            className="user-button"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="user-icon">
                                <FiUser />
                            </div>
{}
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
                </header>
                {/* <hr/> */}
            </div>
        </>
    )
}

export default Header;