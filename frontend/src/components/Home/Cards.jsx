import React from "react";
import { CiHeart } from "react-icons/ci";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Cards = ({ tasks = [], toggleInputModal, setTasks, setUpdatedTask }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleTaskUpdate = async (id, field) => {
        try {
            const url =
                field === "important"
                    ? `http://localhost:1000/api/v2/update-imp-task/${id}`
                    : `http://localhost:1000/api/v2/update-complete-task/${id}`;

            const response = await axios.put(url, {}, { headers });
            if (response.status === 200) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === id
                            ? { ...task, [field]: !task[field] }
                            : task
                    )
                );
            }
        } catch (error) {
            console.error(`Error updating task (${field}):`, error);
            alert(`Failed to update task (${field}).`);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`,
                { headers }
            );
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task.");
        }
    };

    if (!Array.isArray(tasks)) {
        return (
            <p className="text-center text-gray-400">No tasks available to display.</p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
            {tasks.map((task) => (
                <div key={task._id} className="w-full bg-gray-800 p-4 rounded-md">
                    <h3 className="text-lg md:text-xl text-white-900 font-semibold truncate">{task.title}</h3>
                    <p className="text-white-900 mt-2 truncate">{task.desc}</p>
                    <div className="mt-4 flex justify-between">
                        <button
                            className={`p-2 rounded ${
                                task.important
                                    ? "bg-blue-500" // Info color when marked as important
                                    : task.complete
                                    ? "bg-green-700" // Green when completed
                                    : "bg-red-400" // Red when incomplete
                            }`}
                            onClick={() => handleTaskUpdate(task._id, "complete")}
                        >
                            {task.complete ? "Completed" : "In Completed"}
                        </button>
                        <div className="flex space-x-4">
                            <button onClick={() => handleTaskUpdate(task._id, "important")}>
                                {task.important ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <CiHeart />
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setUpdatedTask(task);
                                    toggleInputModal();
                                }}
                            >
                                <MdEdit />
                            </button>
                            <button onClick={() => deleteTask(task._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
