import React, { useEffect, useState, useRef } from "react";
import './Table.css';
import {
    FiCheckSquare, FiCalendar, FiSquare, FiEdit2, FiTrash2
} from "react-icons/fi";
export function Table({ tasks, setDueDate, setTitle, setPriority, setCompleted, setTasks,editTask }) {


    //Delete Tasks
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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className='table-section'>
                {tasks.length > 0 ?

                    (<table className="table align-middle shadow-sm" >

                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>

                                    {/* Checkbox */}
                                    <td style={{ width: "60px" }}>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleTask(task.id)}
                                        >
                                            {task.completed ? (
                                                <FiCheckSquare
                                                    color="#4F46E5"
                                                    size={24}
                                                />
                                            ) : (
                                                <FiSquare
                                                    color="#C5C5C5"
                                                    size={24}
                                                />
                                            )}
                                        </span>
                                    </td>

                                    {/* Title */}
                                    <td style={{ width: "45%" }}>
                                        <span
                                            style={{
                                                float: "left",
                                                textDecoration: task.completed
                                                    ? "line-through"
                                                    : "none"
                                            }}
                                        >
                                            {task.title}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td>
                                        <span
                                            className={`badge rounded-pill px-3 py-2 ${task.priority === "High"
                                                ? "text-danger border border-danger bg-white"
                                                : task.priority === "Medium"
                                                    ? "text-warning border border-warning bg-white"
                                                    : "text-success border border-success bg-white"
                                                }`}
                                        >
                                            {task.priority}
                                        </span>
                                    </td>

                                    {/* Due Date */}
                                    <td className="due-date">
                                        <FiCalendar
                                            color="#667085"
                                            size={18}
                                            className="me-2"
                                        />
                                        {task.dueDate}
                                    </td>

                                    {/* Actions */}
                                    <td>

                                        <FiEdit2
                                            color="#4F46E5"
                                            size={20}
                                            className="me-4"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => editTask(task.id)}
                                        />

                                        <FiTrash2
                                            color="red"
                                            size={20}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => deleteTask(task.id)}
                                        />

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>) :
                    <div>No Records Found</div>
                }


            </section>
        </>
    )
}