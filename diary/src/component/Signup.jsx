import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      user.fullName.trim() === "" ||
      user.email.trim() === "" ||
      user.password.trim() === ""
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {

      const response = await api.post("/auth/register", user);

      if (response.data === "Email already exists") {
        toast.error("This email is already registered.");
        return;
      }

      toast.success("Registration Successful");

      setUser({
        fullName: "",
        email: "",
        password: "",
      });

      setConfirmPassword("");

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error("Registration Failed.");

    }

  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white shadow-2xl border border-pink-200 p-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="text-gray-500 mt-2">
          Start writing your beautiful memories.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border-b-2 border-gray-300 focus:border-violet-500 outline-none py-3 bg-transparent"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full border-b-2 border-gray-300 focus:border-violet-500 outline-none py-3 bg-transparent"
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
            minLength={6}
            className="w-full border-b-2 border-gray-300 focus:border-violet-500 outline-none py-3 bg-transparent"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            minLength={6}
            className="w-full border-b-2 border-gray-300 focus:border-violet-500 outline-none py-3 bg-transparent"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-3 mt-4 hover:bg-violet-700 transition cursor-pointer"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?

          <Link
            to="/login"
            className="text-violet-600 ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </section>
  );
};

export default Signup;