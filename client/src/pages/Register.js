import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pregnancyWeek: "",  // sabo
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", form);
      setMessage("An yi rijista cikin nasara");
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "An samu kuskure");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Register
        </h2>
        <input
          name="name"
          placeholder="Suna"
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={handleChange}
          value={form.name}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Imel"
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Kalmar sirri"
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={handleChange}
          value={form.password}
          required
        />
        <input
          name="pregnancyWeek"
          type="number"
          placeholder="Shigar da makon ciki (misali 12)"
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={handleChange}
          value={form.pregnancyWeek}
          min={1}
          max={42}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          Register
        </button>
        {message && (
          <div
            className={`mt-4 p-3 text-center rounded-xl text-sm ${
              isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;