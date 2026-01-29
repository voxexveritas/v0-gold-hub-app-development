"use client";

import { VideoCard } from "../../components/learn/video-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MobileNav } from "@/components/mobile-nav";
import { useState } from "react"; // Import useState

interface Video {
  id: string;
  title: string;
  thumbnail: string; // Placeholder for now, VideoCard will handle embeds
  url: string; // Full YouTube URL
  category: string;
}

const learningContent: Record<string, Video[]> = {
  Gold: [
    {
      id: "g1",
      title: "5 Best GOLD Investments in 2025 (Ultimate Guide For Investors)",
      thumbnail: "https://img.youtube.com/vi/WvJdmlDYdLQ/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=WvJdmlDYdLQ",
      category: "Gold",
    },
    {
      id: "g2",
      title: "The REAL Reason You Should Invest in Gold",
      thumbnail: "https://img.youtube.com/vi/kaVYxfEgS0Q/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=kaVYxfEgS0Q",
      category: "Gold",
    },
    {
      id: "g3",
      title: "Gold surges to new highs as investors seek 'safe haven' amid global uncertainty",
      thumbnail: "https://img.youtube.com/vi/MgDbfVOfDmU/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=MgDbfVOfDmU",
      category: "Gold",
    },
  ],
  Silver: [
    {
      id: "s1",
      title: "5 Types of Silver to BUY for Beginners",
      thumbnail: "https://img.youtube.com/vi/6oGt8qDJOVE/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=6oGt8qDJOVE",
      category: "Silver",
    },
    {
      id: "s2",
      title: "How to Invest in Gold & Silver: 4 Methods Explained",
      thumbnail: "https://img.youtube.com/vi/elpAnwwxR_4/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=elpAnwwxR_4",
      category: "Silver",
    },
    {
      id: "s3",
      title: "Why I Invest In Silver - PHYSICAL Over SLV and ETFs - Mike Maloney",
      thumbnail: "https://img.youtube.com/vi/x_fmBPWcAkU/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=x_fmBPWcAkU",
      category: "Silver",
    },
  ],
  Palladium: [
    {
      id: "p1",
      title: "The Best Way To Invest In PALLADIUM Today",
      thumbnail: "https://img.youtube.com/vi/Vz01W14jYRg/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=Vz01W14jYRg",
      category: "Palladium",
    },
    {
      id: "p2",
      title: "What You NEED To Know About Investing In Palladium!",
      thumbnail: "https://img.youtube.com/vi/aCg32rF9-X8/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=aCg32rF9-X8",
      category: "Palladium",
    },
    {
      id: "p3",
      title: "PALLADIUM vs PLATINUM! Which Is The BETTER Investment?",
      thumbnail: "https://img.youtube.com/vi/P-f2e-0q04g/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=P-f2e-0q04g",
      category: "Palladium",
    },
  ],
  "Rare Coins": [
    {
      id: "rc1",
      title: "Coin Collecting 101 for Beginners: What You Need to Know to Start Coin Collecting",
      thumbnail: "https://img.youtube.com/vi/cdeGZ8yJyZQ/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=cdeGZ8yJyZQ",
      category: "Rare Coins",
    },
    {
      id: "rc2",
      title: "Coin Collecting For Beginners - Intro To Coin Collecting 101",
      thumbnail: "https://img.youtube.com/vi/mwXvvh6XXa0/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=mwXvvh6XXa0",
      category: "Rare Coins",
    },
    {
      id: "rc3",
      title: "ANA eLearning Academy - Coin Collecting Basics",
      thumbnail: "https://img.youtube.com/vi/AbKcarLPaXo/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=AbKcarLPaXo",
      category: "Rare Coins",
    },
  ],
  Antiques: [
    {
      id: "a1",
      title: "How to Price Antiques, Vintage & Collectibles to Sell Fast!",
      thumbnail: "https://img.youtube.com/vi/YKsoXfa_HKw/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=YKsoXfa_HKw",
      category: "Antiques",
    },
    {
      id: "a2",
      title: "How to Collect Antique Jewellery (5 Top Tips)",
      thumbnail: "https://img.youtube.com/vi/86aWYgfUCw0/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=86aWYgfUCw0",
      category: "Antiques",
    },
    {
      id: "a3",
      title: "How to be a Better Collector: Understanding Basic Collecting Fundamentals",
      thumbnail: "https://img.youtube.com/vi/fJt0-q0sN1o/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=fJt0-q0sN1o",
      category: "Antiques",
    },
  ],
};

export default function LearnPage() {
  // activeTab and onTabChange are not directly used on this page for scrolling,
  // but MobileNav requires them. We can pass dummy values or refactor MobileNav
  // if this page truly doesn't need that state. For now, a dummy state.
  const [activeTab, setActiveTab] = useState<any>("none");
  const handleTabChange = (tab: any) => {}; // Dummy function

  return (
    <div className="min-h-screen">
      <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Learn About Precious Metals & Collectibles</h1>
        <p className="text-lg mb-8 text-muted-foreground">Expand your knowledge with our curated learning resources across various categories.</p>

        {Object.entries(learningContent).map(([category, videos]) => (
          <Card key={category} className="glass-card mb-8 rounded-xl">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">{category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex space-x-4 overflow-x-auto pb-4 glass-scroll">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}