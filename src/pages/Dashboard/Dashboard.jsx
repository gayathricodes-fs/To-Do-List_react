


import React, { useEffect, useState, useRef } from "react";
import TaskSummary from '../TaskSummary/TaskSummary.jsx'
import { useTasks } from "../../context/TaskContext.jsx";
import API_URL from "../../api/api";
function Dashboard() {
      const { tasks, setTasks } = useTasks();
     console.log(tasks);
     
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [remainingTasks, setRemainingTasks] = useState(0);
 
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

            // setTasks(data);
        } catch (error) {
            console.error(error);
            tasks([]); // Prevent crashes
        }
    }

  
    const clearCompleted = async () => {
        const completedTasks = tasks.filter((t) => t.completed)
        await Promise.all(
            completedTasks.map((t) => {
                console.log(t);

                fetch(`${API_URL}/tasks/${t.id}`, {
                    method: "DELETE"
                })
            }
            ));
        // update Table using setTasks
        setTasks((previousTasks) => previousTasks.filter((tasks) => !tasks.completed));

        const total = tasks.filter((t) => !t.completed).length
        const completedLength = 0
        const remainingLength = total
        setTotalTasks(total);
        setCompletedTasks(completedLength);
        setRemainingTasks(remainingLength)


    }


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