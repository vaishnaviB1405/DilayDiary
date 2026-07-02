import React from "react";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-100 py-20 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center">
          <p className="text-violet-600 font-semibold tracking-widest uppercase">
            About Daily Diary
          </p>

          <h1 className="text-5xl font-bold text-gray-800 mt-4">
            A Place For Your Thoughts
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-8">
            Daily Diary is your personal space to capture memories,
            thoughts, dreams, and emotions. Whether it's a wonderful
            day, a difficult moment, or a new goal, every page helps
            preserve your story.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <div className="text-5xl mb-5">📖</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Write Freely
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Capture your daily thoughts, experiences, and ideas in
              one peaceful place.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <div className="text-5xl mb-5">🔒</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Your Privacy
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Your diary belongs to you. Your entries stay personal
              and secure.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <div className="text-5xl mb-5">🌸</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Keep Memories
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Read your old entries whenever you want and revisit
              the moments that matter.
            </p>
          </div>

        </div>

        {/* Quote */}
        <div className="mt-24 bg-white rounded-3xl shadow-xl p-12 text-center">

          <h2 className="text-3xl font-bold text-gray-800">
            "Every page you write today becomes a memory tomorrow."
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Thank you for making Daily Diary a part of your journey.
          </p>

        </div>

      </div>

    </section>
  );
};

export default About;