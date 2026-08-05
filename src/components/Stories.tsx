import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_HOST = "https://api.navianpharma.com";

export function Stories() {
  const [stories, setStories] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH STORIES
  useEffect(() => {
    fetch(`${API_HOST}/api/hero-images`)
      .then(res => {
        console.log("📡 API Response Status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("📦 API Data Received:", data);
        if (Array.isArray(data) && data.length > 0) {
          console.log("✅ Stories loaded:", data.length, "stories");
          setStories(data);
        } else {
          console.warn("⚠️ No stories found in API response");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to fetch stories:", err);
        setLoading(false);
      });
  }, []);

  // AUTO ROTATE STORIES
  useEffect(() => {
    if (stories.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stories]);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-300 mb-4">
            <p className="font-semibold">⚠️ No stories found</p>
            <p className="text-sm mt-2">API: {API_HOST}/api/hero-images</p>
            <p className="text-sm">Check browser console for details (F12)</p>
          </div>
          <p className="text-gray-700">
            Admin, please upload story images in the admin panel!
          </p>
        </div>
      </section>
    );
  }

  const currentStory = stories[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Debug Info
        <div className="text-xs text-gray-500 text-center mb-4">
          Stories loaded: {stories.length} | API: {API_HOST}/api/hero-images
        </div> */}

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          <span className="text-golden-yellow">Our</span> New Products
        </h2>

        {/* Carousel */}
        <div className="relative group">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <a href={`/product/${currentStory.product_id}`}>
  <img
    key={currentStory.id}
    src={`${API_HOST}/${currentStory.image}`}
    alt={`Story ${currentStory.slot}`}
    className="w-full 
    h-[220px] 
    sm:h-[300px] 
    md:h-[390px] 
    lg:h-[420px] 
    xl:h-[490px] 
    object-contain
    rounded-2xl 
    transition-all duration-500 
    cursor-pointer"
    onError={(e) => {
      console.error("Image failed to load:", currentStory.image);
      e.currentTarget.src =
        "https://via.placeholder.com/1200x700?text=Story+Image";
    }}
  />
</a>
          </div>

          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrentIndex(
                prev => (prev - 1 + stories.length) % stories.length
              )
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 
            bg-white/20 hover:bg-white/40 
            text-white p-4 md:p-5 rounded-full 
            transition-all duration-300 
            opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrentIndex(prev => (prev + 1) % stories.length)
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 
            bg-white/20 hover:bg-white/40 
            text-white p-4 md:p-5 rounded-full 
            transition-all duration-300 
            opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={32} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {currentIndex + 1} / {stories.length}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-[#38BDF8] w-10"
                  : "bg-gray-500 hover:bg-gray-400 w-3"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}