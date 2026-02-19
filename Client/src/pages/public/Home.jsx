import React, { useState, useEffect } from 'react';

// Components
import HeroSection from '../../components/home/HeroSection';
import IdentitySection from '../../components/home/IdentitySection';
import FeaturedMemories from '../../components/home/FeaturedMemories';
import PhilosophySection from '../../components/home/PhilosophySection';
import ThoughtSection from '../../components/home/ThoughtSection';
import CTASection from '../../components/home/CTASection';
import { dailyQuotes } from '../../data/quotes';
// Footer is handled by MainLayout to avoid duplication

const Home = () => {
  // State Management (as per roadmap)
  const [about, setAbout] = useState(null);
  const [memories, setMemories] = useState(null);
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock API Calls (Phase 9)
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Simulate API delays
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 1. Identity Data
        setAbout({
          intro: "Capturing moments, creating stories, and inspiring the next wave.",
          traits: ["Digital Creator", "Visual Storyteller", "Trend Setter", "Lifestyle Curator"]
        });

        // 2. Featured Memories Data (Limit 3)
        setMemories([
          { id: 1, title: 'The First Spark', preview: 'Where the coding journey truly began.', date: 'Dec 2025' },
          { id: 2, title: 'Midnight Debugging', preview: 'When the caffeine hits just right.', date: 'Jan 2026' },
          { id: 3, title: 'System Architecture', preview: 'Building complex systems from scratch.', date: 'Feb 2026' }
        ]);

        // 3. Thought of the Day Logic
        const date = new Date().getDate(); // 1-31
        const quoteIndex = (date - 1) % dailyQuotes.length; // 0-30, safe mapping
        setThought(dailyQuotes[quoteIndex]);

      } catch (error) {
        console.error("Failed to fetch home data", error);
        // Fallback or error state logic here
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
      <ThoughtSection thought={thought} />
      <CTASection />
      {/* Footer is rendered by MainLayout */}
    </div>
  );
};

export default Home;
