


import React, { useEffect, useState, useRef } from "react";
import TaskSummary from '../TaskSummary/TaskSummary.jsx'
import { useTasks } from "../../context/TaskContext.jsx";
import API_URL from "../../api/api";
function Dashboard() {
    const { tasks, setTasks } = useTasks();
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [remainingTasks, setRemainingTasks] = useState(0);

    useEffect(() => {
        fetchTask()
    }, [])


    //Fetch Tasks
   const fetchTask = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        const total = data.length;
        const completedLength = data.filter(
            (task) => task.completed
        ).length;

        const remainingLength = total - completedLength;

        setTotalTasks(total);
        setCompletedTasks(completedLength);
        setRemainingTasks(remainingLength);
        setTasks(data);

    } catch (error) {
        console.error("FETCH ERROR:", error);
        setTasks([]);
    }
};


 const clearCompleted = async () => {

    const completedTasksList = tasks.filter(
        (task) => task.completed
    );

    try {
        await Promise.all(
            completedTasksList.map(async (task) => {
                const response = await fetch(
                    `${API_URL}/tasks/${task._id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to delete task ${task._id}`);
                }
            })
        );

        const updatedTasks = tasks.filter(
            (task) => !task.completed
        );

        setTasks(updatedTasks);

        const total = updatedTasks.length;
        const completed = updatedTasks.filter(
            (task) => task.completed
        ).length;
        const remaining = total - completed;

        setTotalTasks(total);
        setCompletedTasks(completed);
        setRemainingTasks(remaining);

    } catch (error) {
        console.error("DELETE ERROR:", error);

        // Refresh from backend if a deletion fails
        fetchTask();
    }
};

    return (
        <>


            <TaskSummary totalTasks={totalTasks}
                completedTasks={completedTasks}
                remainingTasks={remainingTasks}
                clearCompleted={clearCompleted}></TaskSummary>

        </>
    )
}


export default Dashboard