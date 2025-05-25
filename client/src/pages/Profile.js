import React from "react";
import { FaUserCircle, FaEdit, FaHome, FaLightbulb, FaRobot, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 pt-20 px-4 pb-24">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle size={80} className="text-green-600 mb-2" />
          <h2 className="text-xl font-bold text-green-800">{user.name || "Sunan Ki"}</h2>
          <p className="text-sm text-gray-600">{user.email || "Imel ɗinki"}</p>
        </div>

        <div className="space-y-4 text-gray-800">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Sunan Cikakke:</span>
            <span>{user.name || "Ba a saka ba"}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Imel:</span>
            <span>{user.email || "Ba a saka ba"}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Mako na ciki:</span>
            <span>{user.pregnancyWeek || "Ba a saka ba"}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <FaEdit />
            <span>Gyara Bayani</span>
          </button>
        </div>
      </div>

      {/* Footer Nav */}
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

export default Profile;