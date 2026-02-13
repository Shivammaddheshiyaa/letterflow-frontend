import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function WriteLetter() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [letter, setLetter] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [saving, setSaving] = useState(false);

  const MAX_CHARS = 2000;

  // ✅ Character count
  useEffect(() => {
    setCharacterCount(letter.length);
  }, [letter]);

  // ✅ Stable prompts (ESLint safe)
  const prompts = useMemo(() => [
    "What's something you've always wanted to say but couldn't?",
    "Share a memory that still makes you smile...",
    "What do you appreciate most about this person?",
    "If you could say one thing without consequences, what would it be?",
    "What wish do you have for their future?",
  ], []);

  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);

  // ✅ Rotate prompts safely
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentPrompt(prompts[randomIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [prompts]);

  // ✅ Save letter
  const handleSubmit = async () => {
    if (letter.trim().length < 10) {
      alert("Please write at least 10 characters.");
      return;
    }

    try {
      setSaving(true);

      const res = await axios.post(
        `${API_URL}/api/letters`,
        { content: letter },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Navigate with letterId
      navigate("/address", {
        state: { letterId: res.data.letter._id },
      });

    } catch (err) {
      console.error("Save letter error:", err);
      alert(err.response?.data?.message || "Failed to save letter");
    } finally {
      setSaving(false);
    }
  };

  const handleTypingStart = () => setIsTyping(true);
  const handleTypingEnd = () => setTimeout(() => setIsTyping(false), 1000);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            ← Back to Home
          </button>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Write Your Letter
          </h1>

          <p className="text-lg text-gray-600">
            Pour your heart out. Delivered with privacy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT: PROMPTS */}
          <div className="lg:col-span-1 space-y-6">

            <div className="bg-white rounded-2xl p-6 shadow border">
              <h3 className="font-semibold mb-3">Writing Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be honest</li>
                <li>• Focus on feelings</li>
                <li>• Stay respectful</li>
                <li>• No contact info</li>
                <li>• Max {MAX_CHARS} characters</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow">
              <p className="italic text-gray-800">"{currentPrompt}"</p>
              <p className="text-xs text-gray-600 mt-2">
                Prompt changes every 8 seconds
              </p>
            </div>
          </div>

          {/* RIGHT: TEXTAREA */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow border">

            {/* Counter */}
            <div className="flex justify-between text-sm mb-3">
              <span>
                {characterCount} / {MAX_CHARS}
              </span>
              <span className={isTyping ? "text-green-500" : "text-gray-400"}>
                {isTyping ? "Typing..." : "Idle"}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(characterCount / MAX_CHARS) * 100}%` }}
              />
            </div>

            {/* Textarea */}
            <textarea
              className="w-full border rounded-xl p-4 min-h-[250px] focus:outline-none focus:ring"
              placeholder="Dear reader..."
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              onFocus={handleTypingStart}
              onBlur={handleTypingEnd}
              maxLength={MAX_CHARS}
            />

            {/* Stats */}
            <div className="flex justify-between text-sm text-gray-600 mt-3">
              <span>Words: {letter.trim() ? letter.trim().split(/\s+/).length : 0}</span>
              <span>Lines: {letter.split("\n").length}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setLetter("")}
                className="flex-1 bg-gray-200 py-3 rounded-xl"
              >
                Clear
              </button>

              <button
                onClick={handleSubmit}
                disabled={saving || letter.trim().length < 10}
                className={`flex-1 py-3 rounded-xl text-white ${
                  saving
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                }`}
              >
                {saving ? "Saving..." : "Continue to Address"}
              </button>
            </div>

          </div>
        </div>

        {/* Step indicator */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Step 1 of 4: Write Letter
        </div>

      </div>
    </div>
  );
}
