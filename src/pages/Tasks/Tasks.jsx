
import AddTask from '../AddTask/AddTask.jsx';
import React, { useEffect, useState, useRef } from "react";

import { TaskTable } from '../TaskTable/TaskTable.jsx';
import FilterTask from '../FilterTask/FilterTask.jsx'
import { useTasks } from '../../context/TaskContext.jsx';
import API_URL from "../../api/api";
function Tasks(){
  const { tasks, setTasks } = useTasks();
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
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [remainingTasks, setRemainingTasks] = useState(0);
    //Check form validity
    const [error, setError] = useState({
        title: "",
        dueDate: "",
        priority: ""
    });

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all")

    //Filter task
   const  setActiveFilterTask = async (param) => {
    console.log(param);
     setActiveFilter(activeFilter)
        if (param === 'all') {
            fetchTask();
        }

        if (param === 'active') {
            try {
                const response = await fetch(`${API_URL}/tasks`)
                const data = await response.json();
                const activeTasks = data.filter((task) => !task.completed);
                setTasks(activeTasks);
            } catch (error) {
                console.error(error);
                setTasks([]); // Prevent crashes
            }
        }

        if (param === 'completed') {
            try {
                const response = await fetch(`${API_URL}/tasks`)
                const data = await response.json();
                const activeTasks = data.filter((task) => task.completed);
                setTasks(activeTasks);
            } catch (error) {
                console.error(error);
                setTasks([]); // Prevent crashes
            }
        }
       
    }


    //search Tasks
    const filteredData =
        tasks.filter((t) =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase()))

    //Check form validity
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
            const response = await fetch(`${API_URL}/tasks`)
            // if (!response.ok) {
            //     throw new Error("Failed to fetch");
            // }

            const data = await response.json();
            const total = data.length;
            const completedLength = data.filter((task) => task.completed).length;
            const remainingLength = total - completedLength;
            setTotalTasks(total);
            setCompletedTasks(completedLength);
            setRemainingTasks(remainingLength)

            setTasks(data);
        } catch (error) {
            console.error(error);
            setTasks([]); // Prevent crashes
        }
    }

    //Toggle Function
    const toggleTask = async (d) => {
        const task = tasks.find((t) => d === t.id)
        if (!task) return

        const updatedTask = {
            ...task,
            completed: !task.completed
        }

        const response = await fetch(`http://localhost:3001/tasks/${d}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: updatedTask.completed }),
        }

        )
        setTasks(prevTasks =>
            prevTasks.map(t =>
                t.id === d ? updatedTask : t
            )
        );
        fetchTask()
    }



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
                console.log("before", tasks);

                const response = await fetch(`${API_URL}/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                }
                )
                const data = await response.json()

                setTasks((previousTasks) => [data, ...previousTasks])
                setTitle("");
                setDueDate("");
                setPriority("Select")
                fetchTask()
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

    const editTasks = async (id) => {

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
            validateField("title", data.title);
            validateField("dueDate", data.dueDate);
            validateField("priority", data.priority);


        } catch (error) {
            console.error(error);
            setTasks([]); // Prevent crashes
        }
    }

    // delete tasks
    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3001/tasks/${id}`, {
                method: "DELETE"
            }
            )
            setTasks((previousTasks) => previousTasks.filter((tasks) => tasks.id !== id));
            setTitle("");
            setDueDate("");
            setPriority("Select")
            fetchTask()
            setEditId(null);
        } catch (error) {
            console.log(error)
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
            <FilterTask
                setActiveFilterTask={setActiveFilterTask}
                activeFilter={activeFilter}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setActiveFilter={setActiveFilter}>
                
                </FilterTask>
            <TaskTable
                filteredData={filteredData}
                setTitle={setTitle}
                setPriority={setPriority}
                setDueDate={setDueDate}
                setCompleted={setCompleted}
                setTasks={setTasks}
                editTasks={editTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}

            />

        </>
    )
}
export default Tasks