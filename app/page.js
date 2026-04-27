"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [copy, setCopy] = useState({
    headline: "Study Smarter. Achieve More.",
    subheadline: "Focusly helps students beat procrastination and hit their goals.",
    cta: "Get Started Free",
  });
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source") || "organic";

    fetch("/api/personalise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCopy(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCTAClick = () => {
    setClicked(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1 rounded-full">
            AI-Personalised Just For You
          </span>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-8"></div>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {copy.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {copy.subheadline}
            </p>
          </>
        )}

        <button
          onClick={handleCTAClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {clicked ? "✅ You're on the list!" : copy.cta}
        </button>

        <p className="text-gray-400 text-sm mt-4">
          No credit card required · Free forever plan
        </p>
      </div>
    </main>
  );
}