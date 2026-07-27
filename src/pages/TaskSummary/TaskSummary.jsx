import './TaskSummary.css';
import { FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser } from "react-icons/fi";

function TaskSummary(){
    return(
        <>
        <section className="summary-section ">
                <div className='summary-container'>
                    <div className='summary-icons'>
                        <div className='icon-group'>
                            <div className='icon'>
                                <FiList className="menu-icon" size={30} />
                            </div>
                            <div className='text'>
                                 <p>Tasks</p>
                                 <p> 5</p>
                            </div>
                           
                        </div>
                        
                        <FiList className="menu-icon" size={18} /> <p>Tasks</p>
                        <FiList className="menu-icon" size={18} /> <p>Tasks</p>
                    </div>
                </div>
        </section>
        </>
    )
}

export default TaskSummary