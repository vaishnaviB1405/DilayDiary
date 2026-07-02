import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Editor from "../component/Editor";
import api from "../api/api";

const EditDiary = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [entryDate, setEntryDate] = useState("");

    useEffect(() => {
        loadDiary();
    }, []);

    const loadDiary = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/diary/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTitle(response.data.title);
            setContent(response.data.content);
            setMood(response.data.mood);
            setEntryDate(response.data.entryDate);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load diary");

        }

    };

    const updateDiary = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/diary/${id}`,
                {
                    title,
                    content,
                    mood,
                    entryDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Diary Updated Successfully");

            navigate("/mydiaries");

        } catch (error) {

            console.log(error);

            toast.error("Update Failed");

        }

    };

    return (

        <section className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 pt-28 pb-10">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-5xl font-bold text-violet-700 mb-8">
                    ✏ Edit Diary
                </h1>

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

                <div className="flex justify-end mt-8">

                    <button
                        onClick={updateDiary}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg transition"
                    >
                        Update Diary
                    </button>

                </div>

            </div>

        </section>

    );

};

export default EditDiary;