import './Header.css'
import { FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser } from "react-icons/fi";
function Header() {
    return (
        <>
            <div className='container-fluid'>
                <header className="header">
                    <div className="logo">
                        <FiCheckSquare className='icon' color="white" />
                        <div className='logo-title'>
                            <span className='todo'>Todo</span>
                            <span className='list'>List</span>
                        </div>
                    </div>

                    <nav className='nav-items'>
                        <div className='menu'><FiHome className="menu-icon" size={20} color="white" /><a href="#" > Home</a></div>
                        <div className='menu'><FiList className="menu-icon" size={20} /> <a href="#">Tasks</a></div>
                        <div className='menu'><FiBarChart2 className="menu-icon" size={20} /> <a href="#">Stats</a></div>
                        <div className='menu'><FiInfo className="menu-icon" size={20} /> <a href="#">About</a></div>
                    </nav>

                    <div className='user'><FiUser className="user-icon" size={24} color="grey" /><span>Hello, User!</span></div>
                </header>
                {/* <hr/> */}
            </div>
        </>
    )
}

export default Header;