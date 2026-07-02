import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const Login = () => {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/login", login);

      console.log("Backend Response:", response.data);

      if (response.data === "User not found") {
        toast.error("No account found. Please Sign Up first.");
        return;
      }

      if (response.data === "Invalid Password") {
        toast.error("Incorrect Password.");
        return;
      }

      localStorage.setItem("token", response.data);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/diary");
      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error("Login Failed");

    }

  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white shadow-2xl border border-pink-200 p-10">

        <p className="text-violet-600 font-semibold tracking-widest uppercase">
          Welcome Back
        </p>

        <h1 className="text-4xl font-bold text-gray-800 mt-3">
          Login
        </h1>

        <p className="text-gray-500 mt-2">
          Continue writing your beautiful memories.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <input
            type="email"
            name="email"
            value={login.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-3 bg-transparent"
          />

          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-3 bg-transparent"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 transition shadow-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-8">

          Don't have an account?

          <Link
            to="/signup"
            className="text-violet-600 font-semibold ml-2 hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </section>
  );
};

export default Login;