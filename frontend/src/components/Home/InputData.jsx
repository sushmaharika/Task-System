import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ toggleInputModal, setTasks, updatedTask, setUpdatedTask }) => {
    const [formData, setFormData] = useState({ title: "", desc: "" });

    useEffect(() => {
        if (updatedTask) {
            setFormData({ title: updatedTask.title, desc: updatedTask.desc });
        }
    }, [updatedTask]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.desc) {
            alert("All fields are required.");
            return;
        }

        try {
            if (updatedTask) {
                const response = await axios.put(
                    `http://localhost:1000/api/v2/update-task/${updatedTask._id}`,
                    formData,
                    { headers }
                );
                if (response.status === 200) {
                    setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === updatedTask._id
                                ? { ...task, ...formData }
                                : task
                        )
                    );
                }
            } else {
                const response = await axios.post(
                    "http://localhost:1000/api/v2/create-task",
                    formData,
                    { headers }
                );
                if (response.status === 200) {
                    setTasks((prevTasks) => [...prevTasks, response.data.newTask]);
                }
            }

            resetForm();
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to save task.");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", desc: "" });
        setUpdatedTask(null);
        toggleInputModal();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-lg w-1/3">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        {updatedTask ? "Edit Task" : "Add Task"}
                    </h2>
                    <button onClick={resetForm}>
                        <RxCross2 />
                    </button>
                </div>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full mb-4 p-2 rounded bg-gray-700"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                />
                <textarea
                    name="desc"
                    rows="4"
                    placeholder="Description"
                    className="w-full mb-4 p-2 rounded bg-gray-700"
                    value={formData.desc}
                    onChange={(e) =>
                        setFormData({ ...formData, desc: e.target.value })
                    }
                ></textarea>
                <button
                    className="bg-blue-500 px-4 py-2 rounded text-white"
                    onClick={handleSubmit}
                >
                    {updatedTask ? "Update Task" : "Add Task"}
                </button>
            </div>
        </div>
    );
};

export default InputData;
