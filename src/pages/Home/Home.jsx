import './Home.css';
import { FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser, FiPlusCircle, FiCalendar, FiChevronDown } from "react-icons/fi";

function Home() {
    return (
        <>
            <section className="home-section">
                <div className="title">
                    <h2>My To Do List</h2>
                    <p>Stay organized. Get things done.</p>
                </div>
            </section>
            <section className="table-section ">
                <div className='search-container container'>
                    <form className="d-flex row g-2 align-items-center">

                        <div className='task_input col-lg-8'>
                            {/* <FiCalendar  className="menu-icon" size={20} color="black" /> */}
                            <input
                                className="form-control "
                                placeholder="What needs to be done?" />
                        </div>

                        <div className="dropdown col-lg-2">
                            <button className="btn dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>Priority</span><FiChevronDown size={22} color="#6B7280" className='priority' />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">High</a></li>
                                <li><a className="dropdown-item" href="#">Medium</a></li>
                                <li><a className="dropdown-item" href="#">Low</a></li>
                            </ul>
                        </div>
                        <button className="btn btn-primary add-btn col-lg-2" type="submit">
                            <FiPlusCircle className="add-icon" size={20} color="white" /> <span>Add Task</span>
                        </button>
                    </form>
                </div>
            </section>

            <section className='table-section'>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Home