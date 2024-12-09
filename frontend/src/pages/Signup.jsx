import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [response, setResponse] = useState(null);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up", Data);
        setResponse(response);
        if (response.status === 200) {
          alert(response.data.message);
          setData({ username: "", email: "", password: "" });
          navigate("/login"); // Redirect to login page after signup
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center" style={{ background: "linear-gradient(to bottom, #00008B, #FFFFFF)" }}>
      <div className="p-4 w-full max-w-md sm:w-4/6 md:w-3/6 lg:w-2/6 rounded" style={{ background: "linear-gradient(to bottom, #00008B, #FFFFFF)" }}>
        <div className="text-2xl font-semibold">Signup</div>
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
            type="email"
            name="email"
            placeholder="email"
            className="bg-white-700 text-gray-800 px-3 py-2 my-3 w-full rounded"
            value={Data.email}
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
            <button type="submit" className="bg-blue-400 text-l font-semibold text-gray-700 px-3 py-2 rounded">
              SignUp
            </button>
            {/* {response?.data?.success ? (
              <Link to="/login" className="text-gray-700 hover:text-blue-800">
                Login Here
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-800">
                Already Having An Account? Login here
              </Link>
            )} */}
            <Link to="/login" className="text-gray-700 hover:text-blue-800">
              Already Having An Account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;