import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const ImportantTasks = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:1000/api/v2/get-imp-tasks?page=${page}`,
                    { headers }
                );
                if (response.status === 200 && Array.isArray(response.data?.data)) {
                    const newTasks = response.data.data;

                    // Ensure unique tasks based on the task ID
                    setData((prevData) => {
                        const uniqueTasks = newTasks.filter(
                            (newTask) => !prevData.some((task) => task._id === newTask._id)
                        );
                        return [...prevData, ...uniqueTasks];
                    });
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                alert("Failed to load tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [page]); // Removed `data` from dependencies to avoid excessive re-renders

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="p-4 overflow-y-auto max-h-screen" onScroll={handleScroll}>
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">Important Tasks</h1>
            {data.length > 0 ? (
                <Cards tasks={data} toggleInputModal={() => {}} setTasks={setData} setUpdatedTask={() => {}} />
            ) : (
                <p className="text-center text-gray-400">No important tasks available.</p>
            )}
            {loading && <p className="text-center text-gray-400">Loading...</p>}
        </div>
    );
};

export default ImportantTasks;
