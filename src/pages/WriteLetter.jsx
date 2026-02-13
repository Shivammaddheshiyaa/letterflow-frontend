import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function WriteLetter() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [letter, setLetter] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const MAX_CHARS = 2000;

  // Calculate character count
  useEffect(() => {
    setCharacterCount(letter.length);
  }, [letter]);

  const handleSubmit = async () => {
  if (letter.trim().length < 10) {
    alert("Please write at least 10 characters.");
    return;
  }

  try {
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

    // ✅ Letter saved → move forward with letterId
    navigate("/address", {
      state: { letterId: res.data.letter._id },
    });

  } catch (err) {
    console.error("Save letter error:", err);
    alert(err.response?.data?.message || "Failed to save letter");
  }
};


  // Inspiration prompts
  const prompts = [
    "What's something you've always wanted to say but couldn't?",
    "Share a memory that still makes you smile...",
    "What do you appreciate most about this person?",
    "If you could say one thing without consequences, what would it be?",
    "What wish do you have for their future?",
  ];

  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);

  // Rotate prompts
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentPrompt(prompts[randomIndex]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = () => {
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Write Your Letter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pour your heart out. Every word is reviewed with care and delivered with privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Guidelines */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Writing Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Be honest and authentic</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Focus on your feelings</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Keep it respectful and kind</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">No personal contact info</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Max {MAX_CHARS.toLocaleString()} characters</span>
                </li>
              </ul>
            </div>

            {/* Inspiration Prompt */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Need Inspiration?
              </h3>
              <div className="bg-white/80 rounded-lg p-4 mb-4 min-h-[100px] flex items-center">
                <p className="text-gray-800 italic text-lg">"{currentPrompt}"</p>
              </div>
              <p className="text-sm text-gray-600">
                Prompts change every 8 seconds to spark your thoughts
              </p>
            </div>
          </div>

          {/* Right Column - Writing Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-full">
              {/* Character Counter */}
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm font-medium ${characterCount > MAX_CHARS ? 'text-red-600' : 'text-gray-600'}`}>
                  {characterCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
                </span>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${isTyping ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  <span className="text-xs text-gray-500">
                    {isTyping ? 'Typing...' : 'Ready to write'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    characterCount > MAX_CHARS ? 'bg-red-500' : 
                    characterCount > MAX_CHARS * 0.8 ? 'bg-yellow-500' : 
                    'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min((characterCount / MAX_CHARS) * 100, 100)}%` }}
                ></div>
              </div>

              {/* Textarea */}
              <div className="relative mb-6">
                <textarea
                  className="w-full border-2 border-gray-300 rounded-xl p-5 min-h-[300px] text-lg text-gray-800 font-serif focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Dear reader, 

Start writing your heartfelt message here...

With warmth,"
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  onFocus={handleTypingStart}
                  onBlur={handleTypingEnd}
                  onKeyDown={handleTypingStart}
                  maxLength={MAX_CHARS}
                  autoFocus
                />
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-blue-300 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-blue-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-blue-300 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-blue-300 rounded-br-xl"></div>
              </div>

              {/* Word Count Stats */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Words:</span> {letter.trim() ? letter.trim().split(/\s+/).length : 0}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Lines:</span> {letter.trim() ? letter.split('\n').length : 0}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Reading time:</span> ~{Math.ceil(letter.trim().split(/\s+/).length / 200)} min
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setLetter("")}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 text-lg font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={letter.trim().length < 10 || letter.trim().length > MAX_CHARS}
                  className={`flex-1 px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${
                    letter.trim().length < 10 || letter.trim().length > MAX_CHARS
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  Continue to Address
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Privacy Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Your privacy is protected</p>
                    <p className="text-sm text-blue-600">
                      Your letter will be reviewed for safety but your identity will never be shared with the recipient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
          <div>
            Step 1 of 4: Write Letter
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}