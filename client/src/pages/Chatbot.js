import React, { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import knowledgeBase from '../data/knowledgeBase.json';
import { FaHome, FaLightbulb, FaRobot, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const fuse = new Fuse(knowledgeBase, {
    keys: ['question', 'keywords'],
    threshold: 0.5, // More flexible matching
    includeScore: true,
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = () => {
    if (!input.trim()) return;

    const results = fuse.search(input.toLowerCase());
    let answer = "Yi hakuri, ban fahimci tambayar ba. Da fatan za ka sake gwadawa.";

    if (results.length > 0 && results[0].score < 0.6) {
      answer = results[0].item.answer;
    }

    const newChat = [
      ...chat,
      { type: 'user', message: input },
      { type: 'bot', message: answer }
    ];

    setChat(newChat);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="relative min-h-screen bg-green-50 flex flex-col">

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-20 flex items-center justify-center rounded-b-lg">
        <h1 className="text-xl font-bold text-green-700">UwaLafiya Chatbot</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-grow px-4 pt-20 pb-24">

        {/* Chat messages container */}
        <div className="flex-grow bg-white border rounded-2xl shadow-lg overflow-y-auto p-5 mb-6">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                msg.type === 'user' ? 'bg-blue-100 ml-auto text-right' : 'bg-green-100'
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-3 rounded-l-lg outline-none"
            placeholder="Rubuta tambayarka..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition"
            onClick={handleSend}
          >
            Aika
          </button>
        </div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white py-2 flex justify-around border-t shadow-lg z-20">
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
      </nav>

    </div>
  );
};

export default Chatbot;