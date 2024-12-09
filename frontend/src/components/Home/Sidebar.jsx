import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { IoExit } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = [
        { title: "All tasks", icon: <CgNotes />, link: "/" },
        { title: "Important tasks", icon: <MdLabelImportant />, link: "/importanttasks" },
        { title: "Completed tasks", icon: <FaCheckDouble />, link: "/completedtasks" },
        { title: "Incompleted tasks", icon: <TbNotebookOff />, link: "/incompletedtasks" },
    ];

    const [Data, setData] = useState();
    const [isHovered, setIsHovered] = useState(false);

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        navigate("/signup");
    };

    const headers = { id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}` };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
                console.log(response);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetch();
    }, [headers]);

    return (
        <div
            className={`bg-gray-900 text-white transition-all duration-300 ${
                isHovered ? "w-64" : "w-16"
            } h-screen fixed flex flex-col justify-between`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-4">
                {Data && (
                    <div className="flex items-center">
                        <img
                            src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                            alt={`${Data.username}'s profile`}
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        {isHovered && (
                            <div>
                                <h2 className="text-xl font-semibold">{Data.username}</h2>
                                <h4 className="text-sm">{Data.email}</h4>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="p-4">
                {data.map((item, i) => (
                    <Link
                        to={item.link}
                        key={i}
                        className="flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
                        aria-label={item.title}
                    >
                        {item.icon}
                        {isHovered && <span className="ml-4">{item.title}</span>}
                    </Link>
                ))}
            </div>
            <div className="p-4">
                <button
                    onClick={logout}
                    className="flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
                    aria-label="Logout"
                >
                    <IoExit className="text-white" />
                    {isHovered && <span className="ml-4">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
