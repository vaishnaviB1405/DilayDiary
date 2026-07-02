import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

const Editor = ({
  title,
  setTitle,
  content,
  setContent,
  mood,
  setMood,
}) => {
  const [showColors, setShowColors] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const colors = [
    "#000000",
    "#ff0000",
    "#2196f3",
    "#4caf50",
    "#ff9800",
    "#9c27b0",
    "#795548",
    "#607d8b",
    "#e91e63",
    "#ffc107",
    "#00bcd4",
    "#8bc34a",
    "#673ab7",
    "#3f51b5",
    "#009688",
    "#ffffff",
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image,
    ],

    content: content || `
      <h2>📖 Dear Diary</h2>
      <p>Today...</p>
    `,

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p>Today...</p>", false);
    }
  }, [content, editor]);

  if (!editor) return null;

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({
          src: reader.result,
        })
        .run();
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>

      {/* Title */}

      <input
        type="text"
        placeholder="Diary Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-8 py-5 text-3xl font-bold outline-none border-b border-pink-200 bg-[#fffdf8]"
      />

      {/* Mood */}

      <input
        type="text"
        placeholder="How are you feeling today?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full px-8 py-4 outline-none border-b border-pink-200 bg-[#fffdf8]"
      />

      {/* Toolbar */}

      <div className="flex items-center gap-3 p-4 border-b bg-pink-50 flex-wrap">

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-2 border rounded hover:bg-pink-100 font-bold"
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-2 border rounded hover:bg-pink-100 italic"
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-3 py-2 border rounded hover:bg-pink-100 underline"
        >
          U
        </button>

        {/* Color */}

        <div className="relative">

          <button
            onClick={() => setShowColors(!showColors)}
            className="px-3 py-2 border rounded hover:bg-pink-100"
          >
            🎨
          </button>

          {showColors && (
            <div className="absolute top-12 left-0 bg-white shadow-xl rounded-xl border p-3 grid grid-cols-4 gap-2 z-50">

              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setShowColors(false);
                  }}
                  className="w-7 h-7 rounded-full border hover:scale-110 transition"
                  style={{ backgroundColor: color }}
                />
              ))}

            </div>
          )}

        </div>

        {/* Emoji */}

        <div className="relative">

          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="px-3 py-2 border rounded hover:bg-pink-100"
          >
            <Smile size={20} />
          </button>

          {showEmoji && (
            <div className="absolute top-12 left-0 z-50">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  editor
                    .chain()
                    .focus()
                    .insertContent(emojiData.emoji)
                    .run();

                  setShowEmoji(false);
                }}
              />
            </div>
          )}

        </div>

        {/* Image */}

        <input
          id="imageUpload"
          type="file"
          hidden
          accept="image/*"
          onChange={uploadImage}
        />

        <button
          onClick={() =>
            document.getElementById("imageUpload").click()
          }
          className="px-3 py-2 border rounded hover:bg-pink-100"
        >
          🖼️
        </button>

      </div>

      {/* Editor */}

      <EditorContent
        editor={editor}
        className="min-h-[600px] p-10 bg-[#fffdf8] outline-none"
      />

    </div>
  );
};

export default Editor;