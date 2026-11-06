
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
      useEffect(() => {
        fetchTask()
    }, [])



    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all")

    //Filter task
   const setActiveFilterTask = async (param) => {
    setActiveFilter(param);

    try {
        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        if (param === "active") {
            setTasks(data.filter((task) => !task.completed));
        } else if (param === "completed") {
            setTasks(data.filter((task) => task.completed));
        } else {
            setTasks(data);
        }
    } catch (error) {
        console.error("FILTER ERROR:", error);
        setTasks([]);
    }
};


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


  
    //Fetch Tasks
    const fetchTask = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        console.log(response);
        
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        setTotalTasks(data.length);
        setCompletedTasks(data.filter(task => task.completed).length);
        setRemainingTasks(data.filter(task => !task.completed).length);

        setTasks(data);
    } catch (error) {
        console.error("FETCH ERROR:", error);
        setTasks([]);
    }
};

    //Toggle Function
    const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: !task.completed,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const updatedTask = await response.json();

        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t._id === id ? updatedTask : t
            )
        );

        fetchTask();
    } catch (error) {
        console.error("TOGGLE ERROR:", error);
    }
};



    //Add Tasks 
    const addTask = async () => {
    validateField("title", title);
    validateField("dueDate", dueDate);
    validateField("priority", priority);

    if (
        title.trim() === "" ||
        dueDate === "" ||
        priority === "Select"
    ) {
        return;
    }

    const obj = {
        title,
        priority,
        dueDate: new Date(dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }),
        completed: false,
    };

    try {
        if (!editId) {
            const response = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const data = await response.json();
            setTasks((previousTasks) => [data, ...previousTasks]);
        } else {
            const response = await fetch(`${API_URL}/tasks/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }
        }

        setTitle("");
        setDueDate("");
        setPriority("Select");
        setEditId(null);

        await fetchTask();

    } catch (error) {
        console.error("SAVE TASK ERROR:", error);
    }
};

    //Edit tasks 

    const editTasks = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`);

        if (!response.ok) {
            throw new Error("Failed to fetch task");
        }

        const data = await response.json();

        setPriority(data.priority);
        setTitle(data.title);
        setCompleted(data.completed);

        const formattedDate = new Date(data.dueDate)
            .toISOString()
            .slice(0, 10);
       
        
        setDueDate(formattedDate);
        setEditId(data._id);

        validateField("title", data.title);
        validateField("dueDate", formattedDate);
        validateField("priority", data.priority);

    } catch (error) {
        console.error("EDIT ERROR:", error);
    }
};

    // delete tasks
  const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        setTasks((previousTasks) =>
            previousTasks.filter((task) => task._id !== id)
        );

        setTitle("");
        setDueDate("");
        setPriority("Select");
        setEditId(null);

        await fetchTask();

    } catch (error) {
        console.error("DELETE ERROR:", error);
    }
};

   

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