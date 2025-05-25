// pages/Tips.js
import React from "react";
import pregnancyTips from "../data/tips.json";
import {
  FaHome,
  FaLightbulb,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Tips = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentWeek = user?.pregnancyWeek ? parseInt(user.pregnancyWeek) : null;
  const weeklyTip = pregnancyTips.find((tip) => tip.week === currentWeek);

  return (
    <div className="min-h-screen bg-green-50 p-6 font-sans pt-24 pb-24">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
        Shawarwarin Lafiya na Mako na {currentWeek || "?"}
      </h1>

      {weeklyTip ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-300 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            {weeklyTip.title}
          </h2>
          <p className="mb-6 text-gray-800 whitespace-pre-wrap">{weeklyTip.tip}</p>

          <h3 className="text-xl font-semibold mb-2 text-green-700">
            Shawarwarin WHO/NHS:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {weeklyTip.who_tips.map((tip, idx) => (
              <li key={idx} className="mb-1">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-red-600 text-lg font-semibold">
          Babu shawara don wannan makon.
        </p>
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white py-2 flex justify-around border-t shadow-lg z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center text-green-700 text-sm"
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/tips")}
          className="flex flex-col items-center text-green-700 text-sm"
        >
          <FaLightbulb size={20} />
          <span className="text-xs mt-1">Shawara</span>
        </button>
        <button
          onClick={() => navigate("/chatbot")}
          className="flex flex-col items-center text-green-700 text-sm"
        >
          <FaRobot size={20} />
          <span className="text-xs mt-1">Chatbot</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-green-700 text-sm"
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Bayanan Ki</span>
        </button>
      </div>
    </div>
  );
};

export default Tips;