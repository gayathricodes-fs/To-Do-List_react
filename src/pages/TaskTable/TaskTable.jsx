import React from "react";
import "./TaskTable.css";
import {
    FiCheckSquare,
    FiCalendar,
    FiSquare,
    FiEdit2,
    FiTrash2
} from "react-icons/fi";

export function TaskTable({
    filteredData,
    editTasks,
    deleteTask,
    toggleTask
}) {
    return (
        <section className="table-section">

            {filteredData.length > 0 ? (
                <div className="table-responsive-wrapper">

                    <table className="table task-table align-middle shadow-sm">

                        <tbody>
                            {filteredData.map((task) => {

                                if (!task) return null;

                                return (
                                    <tr key={task.id}>

                                        {/* Checkbox */}
                                        <td className="checkbox-column">
                                            <span
                                                className="task-checkbox"
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
                                        <td className="title-column">
                                            <span
                                                className={
                                                    task.completed
                                                        ? "task-title completed"
                                                        : "task-title"
                                                }
                                            >
                                                {task.title}
                                            </span>
                                        </td>


                                        {/* Priority */}
                                        <td className="priority-column">

                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    task.priority === "High"
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

                                            <div className="due-date-content">

                                                <FiCalendar
                                                    color="#667085"
                                                    size={18}
                                                />

                                                <span>
                                                    {task.dueDate}
                                                </span>

                                            </div>

                                        </td>


                                        {/* Actions */}
                                        <td className="actions-column">

                                            <div className="task-actions">

                                                <FiEdit2
                                                    color="#4F46E5"
                                                    size={20}
                                                    className="action-icon"
                                                    onClick={() =>
                                                        editTasks(task.id)
                                                    }
                                                />

                                                <FiTrash2
                                                    color="#dc2626"
                                                    size={20}
                                                    className="action-icon"
                                                    onClick={() =>
                                                        deleteTask(task.id)
                                                    }
                                                />

                                            </div>

                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div>

            ) : (

                <div className="no-records">
                    No Records Found
                </div>

            )}

        </section>
    );
}