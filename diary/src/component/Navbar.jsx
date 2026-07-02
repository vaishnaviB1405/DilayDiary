import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    toast.success("Logged Out Successfully");

    navigate("/login");

  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-200 backdrop-blur-md shadow-sm z-50">

      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-violet-600"
        >
          📖 Daily Diary
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="text-gray-700 hover:text-violet-600 font-medium"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-violet-600 font-medium"
          >
            About
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-violet-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-violet-600 text-white px-5 py-2.5 rounded-full hover:bg-violet-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/diary"
                className="bg-violet-600 text-white px-5 py-2.5 rounded-full hover:bg-violet-700 transition"
              >
                Diary
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;