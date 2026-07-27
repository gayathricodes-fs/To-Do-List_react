

import AddTask from '../AddTask/AddTask.jsx';
import React, { useEffect, useState, useRef } from "react";
import {
    FiCheckSquare, FiHome, FiList, FiBarChart2, FiInfo, FiUser, FiPlusCircle, FiCalendar, FiChevronDown,
    FiSquare, FiEdit2, FiTrash2
} from "react-icons/fi";
import { TaskTable } from '../TaskTable/TaskTable';
import FilterTask from '../FilterTask/FilterTask.jsx'
import TaskSummary from '../TaskSummary/TaskSummary.jsx'

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

            <AddTask
                title={title}
                setTitle={setTitle}
                priority={priority}
                prioritiesList={prioritiesList}
                setPriority={setPriority}
                dueDate={dueDate}
                setDueDate={setDueDate}
                addTask={addTask}
                error={error}
                setError={setError}
                dateRef={dateRef}
                today={today}
                editId={editId}
                setEditId={setEditId}
                validateField={validateField}

            />
            <FilterTask></FilterTask>
            <TaskTable
                tasks={tasks}
                setTitle={setTitle}
                setPriority={setPriority}
                setDueDate={setDueDate}
                setCompleted={setCompleted}
                setTasks={setTasks}
                editTask={editTask}
                toggleTask={toggleTask}
            />
            <TaskSummary></TaskSummary>
            
        </>
    )
}


export default Home