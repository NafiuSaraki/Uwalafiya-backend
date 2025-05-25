import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/login");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  // Links da za su bayyana ga kowa
  const publicLinks = [
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // Idan logged in, za a ƙara dashboard
  const loggedInLinks = [...publicLinks, { to: "/dashboard", label: "Dashboard" },  { to: "/chatbot", label: "Chatbot" }];

  const linksToShow = isLoggedIn ? loggedInLinks : publicLinks;

  return (
    <nav className="bg-green-500 text-white px-6 py-4 shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        {/* Logo ko Home link */}
        <a
          href="/"
          onClick={handleHomeClick}
          className="text-2xl font-bold tracking-wide"
        >
          UwaLafiya
        </a>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center absolute md:static bg-green-500 md:bg-transparent w-full md:w-auto left-0 md:left-auto top-16 md:top-auto transition-all duration-300 ease-in-out ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          {linksToShow.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-6 py-3 md:px-3 hover:bg-green-600 md:hover:bg-transparent ${
                location.pathname === to ? "bg-green-700 font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block px-6 py-3 md:px-3 hover:bg-green-600 md:hover:bg-transparent text-left w-full md:w-auto"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-6 py-3 md:px-3 hover:bg-green-600 md:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-6 py-3 md:px-3 hover:bg-green-600 md:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}