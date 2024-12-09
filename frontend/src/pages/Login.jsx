import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
    const [Data, setData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // Redirect to homepage if already logged in
        }
    }, [isLoggedIn, navigate]);

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            if (Data.username === "" || Data.password === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post("http://localhost:1000/api/v1/log-in", Data);
                if (response.status === 200) {
                    setData({ username: "", password: "" });
                    alert("Successfully Login");
                    // Store token and user ID, dispatch login action
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("id", response.data.id);
                    dispatch(authActions.login());
                    navigate("/"); // Redirect to homepage after login
                } else {
                    alert(response.data.message);}
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center" style={{ background: "linear-gradient(to bottom, #00008B, #FFFFFF)" }}>
            <div className="p-4 w-full max-w-md sm:w-4/6 md:w-3/6 lg:w-2/6 rounded" style={{ background: "linear-gradient(to bottom, #00008B, #FFFFFF)" }}>
                <div className="text-2xl font-semibold">Login</div>
                {/* <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="bg-white-700 text-gray-800 px-3 py-2 my-3 w-full rounded"
                    value={Data.username}
                    onChange={change}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="bg-white-700 text-gray-800 px-3 py-2 my-3 w-full rounded"
                    value={Data.password}
                    onChange={change}
                />
                <div className="w-full flex items-center justify-between">
                    <button
                        className="bg-blue-400 text-l font-semibold text-gray-700 px-3 py-2 rounded"
                        onClick={submit}
                    >
                        Login
                    </button>
                    <Link to="/signup" className="text-gray-700 hover:text-blue-800">
                        Not Having An Account? Signup here
                    </Link>
                </div> */}
                <form onSubmit={submit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        className="bg-white-700 text-gray-800 px-3 py-2 my-3 w-full rounded"
                        value={Data.username}
                        onChange={change}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="bg-white-700 text-gray-800 px-3 py-2 my-3 w-full rounded"
                        value={Data.password}
                        onChange={change}
                    />
                    <div className="w-full flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-400 text-l font-semibold text-gray-700 px-3 py-2 rounded"
                        >
                            Login
                        </button>
                        <Link to="/signup" className="text-gray-700 hover:text-blue-800">
                            Not Having An Account? Signup here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
