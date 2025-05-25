import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  // Idan user yana da token, kai shi dashboard kai tsaye
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", form);

      // Nasara
      setMessage("An shiga cikin nasara");
      setIsSuccess(true);

      // Adana token da user info a localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Jira ɗan lokaci ka kai user dashboard
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      // Kuskure daga server ko network
      setMessage(err.response?.data?.message || "An samu kuskure wajen login");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Shiga (Login)
        </h2>
        <input
          name="email"
          type="email"
          placeholder="Imel"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Kalmar sirri"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Login
        </button>
        {message && (
          <div
            className={`mt-4 p-3 text-center rounded-xl text-sm ${
              isSuccess
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;