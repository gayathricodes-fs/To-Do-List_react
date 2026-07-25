import './Home.css';
import React, { useEffect, useState, useRef } from "react";
import {
    FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser, FiPlusCircle, FiCalendar, FiChevronDown,
    FiSquare, FiEdit2, FiTrash2
} from "react-icons/fi";
import { Table } from '../Table/Table';


function Home() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [completed, setCompleted] = useState(false);
    const [editId, setEditId] = useState(null);
    const prioritiesList = [
        { id: 1, name: "Select", val: "" },
        { id: 2, name: "High", val: "High" },
        { id: 3, name: "Medium", val: "Medium" },
        { id: 4, name: "Low", val: "Low" }
    ]
    const [dueDate, setDueDate] = useState("");
    const dateRef = useRef();
    const today = new Date().toISOString().split("T")[0]

    //Check form validity
    const [error, setError] = useState({
        title: "",
        dueDate: "",
        priority: ""
    });

    const [loading, setLoading] = useState(true);
    const validateField = (name, value) => {
        let message = "";

        if (name === "title")
            if (value.trim() === "") {
                message = "Task title is required";
            }
            else if (value.trim().length < 5) {
                message = "Task title should have minimum 5 characters";
            }

        if (name === "priority" && value === "") {
            message = "Priority is required";
        }
        if (name === "dueDate" && value === "") {
            message = "Due date is required";
        }

        setError((prev) => ({
            ...prev,
            [name]: message,
        }));
    };


    useEffect(() => {
        fetchTask()
    }, [])


    //Fetch Tasks
    const fetchTask = async () => {
        try {
            const response = await fetch("http://localhost:3001/tasks")
            // if (!response.ok) {
            //     throw new Error("Failed to fetch");
            // }

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
            setTasks([]); // Prevent crashes
        }
    }

    //Toggle Function
    const toggleTask = (d) =>
        setTasks(
            tasks.map((task) =>
                (task.id) === d ?
                    { ...task, completed: !task.completed }
                    : task
            )
        )

    //Add Tasks 
    const addTask = async () => {
        validateField("title", title);
        validateField("dueDate", dueDate);
        validateField("priority", priority);


        if (title.trim() === "" || dueDate === "" || priority === "Select") {
            return;
        }

        let obj = {
            id: tasks.length + 1,
            title,
            priority,
            dueDate: new Date(dueDate).toLocaleDateString("en-Us", {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            completed: false,
        }

        try {
            if (!editId) {
                const response = await fetch("http://localhost:3001/tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                }
                )
                const data = await response.json()
                setTasks((previousTasks) => [...previousTasks, data])
                setTitle("");
                setDueDate("");
                setPriority("Select")
            }
            else {
                const response = await fetch(`http://localhost:3001/tasks/${editId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                }
                )
                fetchTask();
                setEditId(null);
                setTitle("");
                setDueDate("");
                setPriority("Select")
            }



        } catch (error) {
            console.log(error)
        }


    }

    //Edit tasks 

    const editTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/tasks/${id}`)
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await response.json();
            setPriority(data.priority)
            setTitle(data.title)
            setCompleted(data.completed)
            const formattedDate = new Date(data.dueDate).toLocaleDateString("en-CA");
            setDueDate(formattedDate)
            setEditId(data.id)

        } catch (error) {
            console.error(error);
            setTasks([]); // Prevent crashes
        }
    }



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

            <Table tasks={tasks}
                setTitle={setTitle}
                setPriority={setPriority}
                setDueDate={setDueDate}
                setCompleted={setCompleted}
                setTasks={setTasks}
                editTask={editTask}
            />
        </>
    )
}

export default Home