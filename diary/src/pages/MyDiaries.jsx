import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

const MyDiaries = () => {

  const [selectedDate, setSelectedDate] = useState("");
  const [diary, setDiary] = useState(null);

  const searchDiary = async () => {

    if (!selectedDate) {
      toast.warning("Please select a date");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        `/diary/date/${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDiary(response.data);

      toast.success("Diary Found Successfully");

    } catch (error) {

      console.log(error);

      setDiary(null);

      toast.error("No diary found for this date");

    }

  };

  const deleteDiary = async () => {

    if (!window.confirm("Delete this diary?")) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/diary/${diary.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Diary Deleted Successfully");

      setDiary(null);

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  };

  return (

    <section className="min-h-screen bg-pink-50 pt-28 pb-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-violet-700 mb-8">
          📚 My Diaries
        </h1>

        <div className="flex gap-4 mb-8">

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />

          <button
            onClick={searchDiary}
            className="bg-violet-600 text-white px-6 rounded-lg"
          >
            Search
          </button>

        </div>

        {diary && (

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold">
              {diary.title}
            </h2>

            <p className="mt-3 text-gray-500">
              {diary.entryDate}
            </p>

            <p className="mt-2 font-semibold">
              Mood : {diary.mood}
            </p>

            <hr className="my-6" />

            <div
              dangerouslySetInnerHTML={{
                __html: diary.content,
              }}
            />

            <div className="flex gap-4 mt-8">

              <Link
                to={`/edit/${diary.id}`}
                className="bg-blue-500 text-white px-5 py-3 rounded-lg"
              >
                Edit
              </Link>

              <button
                onClick={deleteDiary}
                className="bg-red-500 text-white px-5 py-3 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        )}

      </div>

    </section>

  );

};

export default MyDiaries;