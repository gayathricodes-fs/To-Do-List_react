import './TaskSummary.css';
import { FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser, FiCheck, FiClock, FiTrash2 } from "react-icons/fi";

function TaskSummary({totalTasks,completedTasks,remainingTasks,clearCompleted}) {
    return (
        <>
            <section className="summary-section ">
                <div className='summary-container'>

                      {/* {tasks.map((task) => ( */}
                    <div className='summary-icons'>
                       
                        <div className='flex'>
                            
                            <div className="icon-group">
                                <div className="circle total">
                                    <FiList className="icon" />
                                </div>

                                <div className="text">
                                    <p>Total Tasks</p>
                                    <h2>{totalTasks}</h2>
                                </div>
                            </div>

                            <div className="icon-group">
                                <div className="circle completed">
                                    <FiCheck className="icon" />
                                </div>

                                <div className="text">
                                    <p>Completed</p>
                                    <h2>{completedTasks}</h2>
                                </div>
                            </div>

                            <div className="icon-group">
                                <div className="circle remaining">
                                    <FiClock className="icon" />
                                </div>

                                <div className="text">
                                    <p>Remaining</p>
                                    <h2>{remainingTasks}</h2>
                                </div>
                            </div>
                            
                        </div>
                         
                          
                        <div className='clear-section'>
                            <button className='clear' onClick={()=>clearCompleted()}>
                                <FiTrash2 size={20} />
                                <p>Clear Completed</p>
                            </button>

                        </div>

                        
                    </div>

                </div>
            </section>
        </>
    )
}

export default TaskSummary