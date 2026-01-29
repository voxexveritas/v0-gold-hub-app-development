"use client";

import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { ChevronLeft, ChevronRight, Play, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: string;
  duration?: string;
}

const learningContent: Record<string, Video[]> = {
  Gold: [
    {
      id: "g1",
      title: "Why Gold Is Hitting Record Highs in 2025",
      thumbnail: "https://img.youtube.com/vi/xNPf45_pUo4/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=xNPf45_pUo4",
      category: "Gold",
      duration: "12:34",
    },
    {
      id: "g2",
      title: "Central Banks Are Buying Gold at Record Pace",
      thumbnail: "https://img.youtube.com/vi/fqDqJa7v0cQ/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=fqDqJa7v0cQ",
      category: "Gold",
      duration: "8:22",
    },
    {
      id: "g3",
      title: "Gold Price Forecast: What Experts Predict",
      thumbnail: "https://img.youtube.com/vi/6mAEWiwL9Po/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=6mAEWiwL9Po",
      category: "Gold",
      duration: "15:10",
    },
    {
      id: "g4",
      title: "How to Buy Physical Gold: Complete Guide",
      thumbnail: "https://img.youtube.com/vi/VyNbsIVBFXk/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=VyNbsIVBFXk",
      category: "Gold",
      duration: "22:15",
    },
    {
      id: "g5",
      title: "Gold vs Stocks: Which Investment Wins?",
      thumbnail: "https://img.youtube.com/vi/WvJdmlDYdLQ/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=WvJdmlDYdLQ",
      category: "Gold",
      duration: "18:45",
    },
    {
      id: "g6",
      title: "Understanding Gold Market Dynamics",
      thumbnail: "https://img.youtube.com/vi/kaVYxfEgS0Q/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=kaVYxfEgS0Q",
      category: "Gold",
      duration: "14:30",
    },
  ],
  Silver: [
    {
      id: "s1",
      title: "Silver Stacking for Beginners 2025",
      thumbnail: "https://img.youtube.com/vi/Ez4kZm3Tsa0/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=Ez4kZm3Tsa0",
      category: "Silver",
      duration: "10:45",
    },
    {
      id: "s2",
      title: "How Much Silver Should You Own?",
      thumbnail: "https://img.youtube.com/vi/YAQhe-gGdhs/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=YAQhe-gGdhs",
      category: "Silver",
      duration: "18:30",
    },
    {
      id: "s3",
      title: "Silver Bullion Buying Strategy",
      thumbnail: "https://img.youtube.com/vi/0u32i2nypvU/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=0u32i2nypvU",
      category: "Silver",
      duration: "14:20",
    },
    {
      id: "s4",
      title: "Best Silver to Stack in 2025",
      thumbnail: "https://img.youtube.com/vi/WBI50e8I3OE/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=WBI50e8I3OE",
      category: "Silver",
      duration: "16:40",
    },
    {
      id: "s5",
      title: "Silver as Savings: Security for Your Wealth",
      thumbnail: "https://img.youtube.com/vi/ZrXUVPmGNdU/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=ZrXUVPmGNdU",
      category: "Silver",
      duration: "20:10",
    },
    {
      id: "s6",
      title: "Understanding Silver Premiums",
      thumbnail: "https://img.youtube.com/vi/HfEBDZq0ItY/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=HfEBDZq0ItY",
      category: "Silver",
      duration: "12:55",
    },
  ],
  Palladium: [
    {
      id: "p1",
      title: "Palladium: The Metal Driving EVs",
      thumbnail: "https://img.youtube.com/vi/8H-zhkp0nVE/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=8H-zhkp0nVE",
      category: "Palladium",
      duration: "9:15",
    },
    {
      id: "p2",
      title: "Platinum vs Palladium Investment",
      thumbnail: "https://img.youtube.com/vi/QnM4Y7xmC4c/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=QnM4Y7xmC4c",
      category: "Palladium",
      duration: "11:42",
    },
    {
      id: "p3",
      title: "Why Palladium Prices Are Changing",
      thumbnail: "https://img.youtube.com/vi/Z8b6pEP5E1A/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=Z8b6pEP5E1A",
      category: "Palladium",
      duration: "13:08",
    },
  ],
  "Rare Coins": [
    {
      id: "rc1",
      title: "Coin Grading Explained for Beginners",
      thumbnail: "https://img.youtube.com/vi/uNgeVl7le4c/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=uNgeVl7le4c",
      category: "Rare Coins",
      duration: "20:15",
    },
    {
      id: "rc2",
      title: "How to Grade Coins Yourself",
      thumbnail: "https://img.youtube.com/vi/t9HbN-OFBlg/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=t9HbN-OFBlg",
      category: "Rare Coins",
      duration: "16:30",
    },
    {
      id: "rc3",
      title: "PCGS Coin Grading Standards",
      thumbnail: "https://img.youtube.com/vi/BTsfq7riLb8/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=BTsfq7riLb8",
      category: "Rare Coins",
      duration: "25:00",
    },
    {
      id: "rc4",
      title: "NGC Coin Grading Guide",
      thumbnail: "https://img.youtube.com/vi/pZuNoNQG6v8/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=pZuNoNQG6v8",
      category: "Rare Coins",
      duration: "28:40",
    },
    {
      id: "rc5",
      title: "Coin Collecting 101 for Beginners",
      thumbnail: "https://img.youtube.com/vi/cdeGZ8yJyZQ/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=cdeGZ8yJyZQ",
      category: "Rare Coins",
      duration: "19:20",
    },
    {
      id: "rc6",
      title: "Intro To Coin Collecting",
      thumbnail: "https://img.youtube.com/vi/mwXvvh6XXa0/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=mwXvvh6XXa0",
      category: "Rare Coins",
      duration: "15:55",
    },
  ],
  Antiques: [
    {
      id: "a1",
      title: "How to Price Antiques to Sell Fast",
      thumbnail: "https://img.youtube.com/vi/YKsoXfa_HKw/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=YKsoXfa_HKw",
      category: "Antiques",
      duration: "12:45",
    },
    {
      id: "a2",
      title: "How to Collect Antique Jewellery",
      thumbnail: "https://img.youtube.com/vi/86aWYgfUCw0/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=86aWYgfUCw0",
      category: "Antiques",
      duration: "8:55",
    },
    {
      id: "a3",
      title: "Understanding Basic Collecting Fundamentals",
      thumbnail: "https://img.youtube.com/vi/fJt0-q0sN1o/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=fJt0-q0sN1o",
      category: "Antiques",
      duration: "19:20",
    },
    {
      id: "a4",
      title: "Antique Gold Jewelry Authentication Tips",
      thumbnail: "https://img.youtube.com/vi/xdZIpRCW9aE/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=xdZIpRCW9aE",
      category: "Antiques",
      duration: "14:30",
    },
    {
      id: "a5",
      title: "Estate Sale Gold & Silver Finds",
      thumbnail: "https://img.youtube.com/vi/TXPnKW3_9Qk/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=TXPnKW3_9Qk",
      category: "Antiques",
      duration: "22:10",
    },
    {
      id: "a6",
      title: "Vintage Watch Collecting Guide",
      thumbnail: "https://img.youtube.com/vi/3sJYNqmF1EA/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=3sJYNqmF1EA",
      category: "Antiques",
      duration: "17:45",
    },
  ],
};

const categories = Object.keys(learningContent);

function VideoCarousel({ videos, category }: { videos: Video[]; category: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
    setPlayingVideo(null);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setPlayingVideo(null);
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {videos.map((video) => {
            const videoId = getYouTubeId(video.url);
            const isPlaying = playingVideo === video.id;

            return (
              <div
                key={video.id}
                className="flex-shrink-0 w-full"
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-white/10 shadow-xl">
                  {/* Video Thumbnail / Embed */}
                  <div className="relative aspect-video bg-muted">
                    {isPlaying && videoId ? (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {/* Play Button */}
                        <button
                          onClick={() => setPlayingVideo(video.id)}
                          className="absolute inset-0 flex items-center justify-center group/play"
                        >
                          <div className="h-20 w-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30 group-hover/play:scale-110 group-hover/play:bg-primary transition-all duration-300">
                            <Play className="h-9 w-9 text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </button>
                        {/* Duration Badge */}
                        {video.duration && (
                          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-sm font-medium text-white">
                            {video.duration}
                          </div>
                        )}
                        {/* Video Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">{video.category}</p>
                          <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
                            {video.title}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setPlayingVideo(null);
              }}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-sm text-muted-foreground">
          {activeIndex + 1} / {videos.length}
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-silver/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-silver/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <MobileNav />

      <main className="mx-auto max-w-7xl px-4 py-8 pb-24 md:pb-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-silver/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative flex items-start gap-4">
              <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-gold-light shadow-lg shadow-primary/30">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Learning Center</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Master <span className="text-primary">Precious Metals</span> Investing
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
                  Expand your knowledge with curated video courses on gold, silver, rare coins, and collectibles from industry experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Category */}
        <section className="mb-12">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{activeCategory}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {learningContent[activeCategory].length} videos available
                </p>
              </div>
            </div>
            <VideoCarousel videos={learningContent[activeCategory]} category={activeCategory} />
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Browse All Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categories
              .filter((cat) => cat !== activeCategory)
              .map((category) => (
                <div key={category} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{category}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className="text-primary hover:text-primary hover:bg-primary/10 rounded-full"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                    {learningContent[category].slice(0, 3).map((video) => (
                      <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-[180px] group"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="h-5 w-5 text-background ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                          {video.duration && (
                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-xs text-white">
                              {video.duration}
                            </div>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h4>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
