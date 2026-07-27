import './AddTask.css';
import React, { useEffect, useState, useRef } from "react";
import {
    FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser, FiPlusCircle, FiCalendar, FiChevronDown,
    FiSquare, FiEdit2, FiTrash2
} from "react-icons/fi";

function AddTask({ title,setTitle,priority,setPriority,dueDate,
    setDueDate,addTask,error,setError,prioritiesList,dateRef,today,editId, setEditId,validateField}) {

    return (
        <>
            <section className="home-section">
                <div className="title">
                    <h2>My To Do List</h2>
                    <p>Stay organized. Get things done.</p>
                </div>
            </section>
            <section className="table-section ">
                <div className='add-task-container '>
                    <form className="d-flex row g-2 align-items-start">

                        <div className='task_input col-lg-6'>

                            <input
                                className="form-control "
                                value={title}
                                placeholder="What needs to be done?"
                                required
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    validateField("title", e.target.value)
                                }
                                }
                            />
                            {error.title && (
                                <small className="text-danger error-msg">{error.title}</small>
                            )}

                        </div>

                        <div className="dropdown col-lg-2">
                            <select
                                className="form-select"
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value)
                                    validateField("priority", e.target.value)
                                }
                                }
                                required
                            >

                                {prioritiesList.map((prt) => (

                                    <option key={prt.id} value={prt.val} >{prt.name}</option>
                                ))}

                            </select>
                            <small className="text-danger error-msg">
                                {error.priority || "\u00A0"}
                            </small>


                        </div>

                        <div className='col-lg-2'>
                            <div className='date-input'>
                                <FiCalendar className="calendar-icon" onClick={() => dateRef.current.showPicker()} />

                                <input
                                    required
                                    value={dueDate}
                                    ref={dateRef}
                                    type="date"
                                    min={today}
                                    className="form-control"
                                    onChange={(e) => {
                                        setDueDate(e.target.value)
                                        validateField("dueDate", e.target.value)
                                    }
                                    }
                                />
                            </div>
                            <div className='error-msg'>
                                <small className="text-danger">
                                    {error.dueDate || "\u00A0"}
                                </small>
                            </div>
                        </div>



                        <div className='col-lg-2'>
                            <button className="btn btn-primary add-btn w-100 " type="button" onClick={() => addTask()} >
                               {
                               !editId ?
                                <div>
                                <FiPlusCircle className="add-icon" size={20} color="white" /> <span >Add Task</span> </div> :
                                <div> <FiPlusCircle className="add-icon" size={20} color="white" /> <span >Update Task</span> </div>

                                } 
                            </button>
                        </div>

                    </form>
                </div>
            </section>

            
        </>
    )
}

export default AddTask