import React, { useState, useEffect } from 'react';
import useSEO from '../../utils/useSEO';// Components
import HeroSection from '../../components/home/HeroSection';
import IdentitySection from '../../components/home/IdentitySection';
import FeaturedMemories from '../../components/home/FeaturedMemories';
import PhilosophySection from '../../components/home/PhilosophySection';
import ThoughtSection from '../../components/home/ThoughtSection';
import CTASection from '../../components/home/CTASection';
import InstagramSection from '../../components/home/InstagramSection';
import { dailyQuotes } from '../../data/quotes';
// Footer is handled by MainLayout to avoid duplication

const Home = () => {
  useSEO(
    "Dheerajj.x | Official Portfolio | Smart Dark & Fearless",
    "Explore the digital world of Dheerajj.x. A smart, dark, and fearless soul sharing design philosophy, deep thoughts, and aesthetic visual storytelling.",
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Dheerajj.x Official Portfolio",
      "description": "Explore the digital world of Dheerajj.x. A smart, dark, and fearless soul sharing design philosophy, deep thoughts, and aesthetic visual storytelling."
    }
  );
  // State Management (as per roadmap)
  const [about, setAbout] = useState(null);
  const [memories, setMemories] = useState(null);
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch real data from API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Identity Data
        setAbout({
          intro: "Capturing moments, creating stories, and inspiring the next wave.",
          traits: ["Digital Creator", "Visual Storyteller", "Trend Setter", "Lifestyle Curator"]
        });

        // 2. Featured Gallery Photos (latest 6 from admin panel)
        try {
          const res = await fetch('http://localhost:201/api/gallery');
          const data = await res.json();
          if (Array.isArray(data)) {
            // Take the latest 6 photos
            setMemories(data.slice(0, 6));
          }
        } catch (galleryError) {
          console.error("Failed to fetch gallery photos", galleryError);
          setMemories([]);
        }

        // 3. Thought of the Day Logic
        const date = new Date().getDate(); // 1-31
        const quoteIndex = (date - 1) % dailyQuotes.length; // 0-30, safe mapping
        setThought(dailyQuotes[quoteIndex]);

      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <IdentitySection about={about} />
      <FeaturedMemories memories={memories} />
      <PhilosophySection />
      <InstagramSection />
      <ThoughtSection thought={thought} />
      <CTASection />
      {/* Footer is rendered by MainLayout */}
    </div>
  );
};

export default Home;
