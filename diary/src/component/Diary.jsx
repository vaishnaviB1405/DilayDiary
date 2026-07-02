import React, { useState } from "react";
import { Save, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Editor from "../component/Editor.jsx";
import api from "../api/api";

const Diary = () => {

  const today = new Date();

  const day = today.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const date = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  const saveDiary = async () => {

    try {

      const token = localStorage.getItem("token");

      const diary = {
        title,
        content,
        mood,
        entryDate: new Date().toISOString().split("T")[0],
      };

      const response = await api.post(
        "/diary",
        diary,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Diary Saved Successfully!");

      console.log(response.data);

      // Clear fields after saving
      setTitle("");
      setContent("");
      setMood("");

    } catch (error) {

      console.log(error);

      toast.error("Failed to Save Diary");

    }

  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 pt-28 pb-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">

          <div>

            <h1 className="text-5xl font-bold text-violet-700">
              📖 Daily Diary
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Every memory deserves to be remembered forever.
            </p>

          </div>

          {/* Date */}

          <div className="bg-white shadow-xl border border-pink-200 rounded-2xl px-8 py-5 text-center">

            <CalendarDays
              className="mx-auto text-violet-600 mb-2"
              size={30}
            />

            <p className="text-2xl font-bold text-violet-700">
              {day}
            </p>

            <p className="text-gray-500 mt-1">
              {date}
            </p>

          </div>

        </div>

        {/* Editor */}

        <div className="bg-[#fffdf8] rounded-3xl shadow-2xl border border-pink-200 overflow-hidden">

          <Editor
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            mood={mood}
            setMood={setMood}
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 mt-8">

          <Link
            to="/mydiaries"
            className="flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300"
          >
            📚 My Diaries
          </Link>

          <button
            onClick={saveDiary}
            className="flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300"
          >
            <Save size={20} />
            Save Diary
          </button>

        </div>

      </div>

    </section>
  );
};

export default Diary;