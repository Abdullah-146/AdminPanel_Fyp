import React, { useState } from "react";
import "../assets/css/login.css";
import { Outlet, Link } from "react-router-dom";
import { login } from "../api/services/auth.service";

function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const setlogin = props?.setlogin;

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      const response = await login({ ...data });
      if (response.status === "OK") {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", response.user);
        // window.location.href = "/";
        console.log("====================================");
        console.log(response.accessToken);
        console.log("====================================");

        setlogin(response?.accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="user-box">
          <input
            type="email"
            value={data.email}
            onChange={handleChange}
            name="email"
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            onChange={handleChange}
            name="password"
            required
          />
          <label>Password</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
