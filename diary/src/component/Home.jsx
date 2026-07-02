import { Link } from "react-router-dom";
import diary from "../assets/logo.jpg";

const Home = () => {

  const token = localStorage.getItem("token");

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-pink-50 via-white to-violet-100 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20 top-20 left-10 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-violet-300 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-8 pt-32 flex flex-col-reverse md:flex-row items-center justify-between">

        {/* Left Side */}
        <div className="md:w-1/2 flex items-center">

          <div>

            <p className="text-pink-500 font-semibold tracking-widest uppercase">
              ✨ Welcome to Daily Diary
            </p>

            <h1 className="mt-4 text-7xl font-black leading-tight text-gray-800">
              Write
              <span className="block text-violet-600">Your Story</span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-lg leading-8">
              Every thought deserves a place.
              Save your memories, emotions, dreams,
              and everyday moments in your own
              beautiful digital diary.
            </p>

            <div className="flex items-center gap-6 mt-10">

              {!token && (
                <Link
                  to="/signup"
                  className="bg-violet-600 text-white px-8 py-3 border border-violet-600 hover:bg-violet-700 transition-all duration-300 shadow-md"
                >
                  Create Your Diary →
                </Link>
              )}

              <Link
                to="/about"
                className="text-gray-700 font-medium border-b-2 border-transparent hover:border-violet-600 hover:text-violet-600 transition"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="bg-white p-5 rounded-2xl shadow-2xl border-2 border-pink-200 rotate-2 hover:rotate-0 duration-300">

          <img
            src={diary}
            alt="Diary"
            className="w-[500px] animate-pulse"
          />

        </div>

      </div>

    </section>
  );
};

export default Home;