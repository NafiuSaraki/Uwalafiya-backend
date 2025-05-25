// pages/Dashboard.js
import React from "react";
import {
  FaBaby,
  FaComments,
  FaAppleAlt,
  FaWalking,
  FaCalendarAlt,
  FaHome,
  FaLightbulb,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import pregnancyTips from "../data/tips.json";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentWeek = user?.pregnancyWeek ? parseInt(user.pregnancyWeek) : null;
  const weeklyTip = pregnancyTips.find((tip) => tip.week === currentWeek);

  return (
    <div className="min-h-screen bg-green-50 p-4 pb-24 pt-10 font-sans">
      {/* Header */}
      <div className="bg-green-700 text-white p-5 rounded-2xl shadow-md">
        <h1 className="text-2xl font-extrabold">Barka da zuwa, {user?.name}!</h1>
        <p className="text-sm mt-1">Ga bayani game da lafiyar ki da jaririnki.</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 my-6">
        <div className="bg-green-200 p-4 rounded-xl flex flex-col items-center shadow-sm">
          <FaBaby size={40} className="text-green-800" />
          {currentWeek ? (
            <>
              <p className="font-bold mt-2">Mako na {currentWeek}</p>
              <span className="text-sm text-gray-700">Cigaban Jariri</span>
            </>
          ) : (
            <>
              <p className="font-bold mt-2 text-red-700">Babu bayanin mako</p>
              <span className="text-sm text-gray-700">Sabunta bayananki</span>
            </>
          )}
        </div>

        {/* An yi wannan card ɗin clickable domin kaiwa chatbot */}
        <button
          onClick={() => navigate("/chatbot")}
          className="bg-green-600 text-white p-4 rounded-xl flex flex-col items-center shadow-sm"
          type="button"
        >
          <FaComments size={40} />
          <p className="font-bold mt-2">Lafiya Chatbot</p>
        </button>
      </div>

      {/* WHO Tip Section */}
      <div className="bg-white p-4 rounded-xl shadow-inner border border-green-200">
        <h3 className="text-lg font-bold text-center mb-3 text-green-800">
          Shawarar WHO – Mako na {currentWeek || "?"}
        </h3>

        <div className="flex justify-around text-green-700 text-3xl mb-3">
          <FaAppleAlt />
          <FaWalking />
          <FaCalendarAlt />
        </div>

        {weeklyTip ? (
          <div className="bg-green-50 p-5 rounded-xl shadow-inner">
            <h4 className="text-md text-center text-green-700 font-bold mb-3">
              {weeklyTip.title}
            </h4>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap text-justify">
              {weeklyTip.tip}
            </p>
          </div>
        ) : (
          <p className="text-center text-sm text-red-600 mt-2 font-semibold">
            Babu shawara don wannan makon.
          </p>
        )}
      </div>

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

export default Dashboard;