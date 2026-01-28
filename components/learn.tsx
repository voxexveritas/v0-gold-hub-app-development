"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Play,
  Clock,
  ChevronRight,
  TrendingUp,
  Coins,
  History,
  Scale,
  Shield,
  Globe,
} from "lucide-react";

type Topic = "investing" | "coins" | "history" | "market" | "security" | "global";

interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoId: string;
}

interface TopicData {
  id: Topic;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  videos: Video[];
}

const topics: TopicData[] = [
  {
    id: "investing",
    label: "Gold Investing",
    icon: TrendingUp,
    description: "Learn strategies for investing in precious metals",
    color: "bg-gold/20 text-gold border-gold/30",
    videos: [
      {
        id: "1",
        title: "Gold Investing for Beginners: Complete 2026 Guide",
        channel: "Precious Metals Academy",
        duration: "24:15",
        views: "1.2M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "2",
        title: "Why Gold is the Ultimate Hedge Against Inflation",
        channel: "Financial Education",
        duration: "18:42",
        views: "856K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "3",
        title: "Physical Gold vs Gold ETFs: What's Better?",
        channel: "Money Talks",
        duration: "15:30",
        views: "623K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "4",
        title: "How to Build a Precious Metals Portfolio",
        channel: "Stacking Silver",
        duration: "32:18",
        views: "445K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "5",
        title: "Gold Price Predictions: Expert Analysis",
        channel: "Bullion Report",
        duration: "21:55",
        views: "389K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    id: "coins",
    label: "Coin Collecting",
    icon: Coins,
    description: "Numismatics and rare coin identification",
    color: "bg-silver/20 text-silver border-silver/30",
    videos: [
      {
        id: "1",
        title: "Rare Coins Worth THOUSANDS in Your Pocket Change",
        channel: "Coin Hunter",
        duration: "19:45",
        views: "2.1M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "2",
        title: "How to Grade Coins Like a Professional",
        channel: "NGC Coins",
        duration: "28:30",
        views: "756K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "3",
        title: "American Gold Eagles: Complete Buyer's Guide",
        channel: "Gold Dealer TV",
        duration: "22:15",
        views: "534K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "4",
        title: "Top 10 Most Valuable Morgan Silver Dollars",
        channel: "Silver Dollar Stories",
        duration: "16:40",
        views: "1.8M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "5",
        title: "Detecting Counterfeit Gold Coins",
        channel: "Bullion Test",
        duration: "14:22",
        views: "892K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    id: "history",
    label: "Gold History",
    icon: History,
    description: "The fascinating history of gold throughout civilization",
    color: "bg-primary/20 text-primary border-primary/30",
    videos: [
      {
        id: "1",
        title: "The History of Gold: From Ancient Egypt to Today",
        channel: "History Channel",
        duration: "45:30",
        views: "3.4M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "2",
        title: "Why Civilizations Chose Gold as Money",
        channel: "Economics Explained",
        duration: "18:15",
        views: "1.6M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "3",
        title: "The Gold Standard: Rise and Fall",
        channel: "Financial History",
        duration: "36:42",
        views: "978K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "4",
        title: "Famous Gold Rushes That Changed History",
        channel: "Documentary Central",
        duration: "52:18",
        views: "2.1M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "5",
        title: "Fort Knox: Inside America's Gold Vault",
        channel: "Discovery Docs",
        duration: "28:55",
        views: "4.2M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    id: "market",
    label: "Market Analysis",
    icon: Scale,
    description: "Technical and fundamental analysis of precious metals",
    color: "bg-success/20 text-success border-success/30",
    videos: [
      {
        id: "1",
        title: "How to Read Gold Price Charts Like a Pro",
        channel: "Trading Academy",
        duration: "26:30",
        views: "445K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "2",
        title: "Gold/Silver Ratio: Trading Strategy Explained",
        channel: "Metals Trading",
        duration: "19:45",
        views: "312K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "3",
        title: "What Moves Gold Prices? Complete Analysis",
        channel: "Market Watch",
        duration: "31:20",
        views: "567K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "4",
        title: "Central Banks and Gold: The Hidden Connection",
        channel: "Economic Truth",
        duration: "24:15",
        views: "723K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "5",
        title: "2026 Precious Metals Outlook",
        channel: "Bullion Report",
        duration: "42:30",
        views: "289K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    id: "security",
    label: "Storage & Security",
    icon: Shield,
    description: "How to safely store your precious metals",
    color: "bg-accent/20 text-accent border-accent/30",
    videos: [
      {
        id: "1",
        title: "Best Ways to Store Physical Gold at Home",
        channel: "Security Pro",
        duration: "17:30",
        views: "1.1M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "2",
        title: "Bank Safe Deposit vs Home Safe: Pros & Cons",
        channel: "Precious Metals TV",
        duration: "14:45",
        views: "678K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "3",
        title: "Allocated vs Unallocated Gold Storage",
        channel: "Bullion Vault",
        duration: "12:20",
        views: "234K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "4",
        title: "How to Insure Your Gold Collection",
        channel: "Asset Protection",
        duration: "16:55",
        views: "189K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "5",
        title: "International Gold Storage: Complete Guide",
        channel: "Global Assets",
        duration: "28:40",
        views: "345K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    id: "global",
    label: "Global Markets",
    icon: Globe,
    description: "International gold markets and trading",
    color: "bg-destructive/20 text-destructive border-destructive/30",
    videos: [
      {
        id: "1",
        title: "How Shanghai Gold Exchange is Changing Everything",
        channel: "Asian Markets",
        duration: "22:15",
        views: "534K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "2",
        title: "BRICS Gold Standard: What It Means for You",
        channel: "Geopolitical Gold",
        duration: "35:30",
        views: "1.8M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "3",
        title: "London Bullion Market: How Gold is Really Traded",
        channel: "Financial Times",
        duration: "19:45",
        views: "423K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "4",
        title: "Swiss Gold Refineries: Inside Tour",
        channel: "Bullion Documentary",
        duration: "48:20",
        views: "2.3M views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "5",
        title: "Which Countries are Buying the Most Gold?",
        channel: "World Gold Council",
        duration: "16:30",
        views: "678K views",
        thumbnail: "",
        videoId: "dQw4w9WgXcQ",
      },
    ],
  },
];

export function Learn() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>("investing");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const currentTopic = topics.find((t) => t.id === selectedTopic)!;

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              Learn
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Educational videos on precious metals investing
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Topic Selector */}
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const isSelected = selectedTopic === topic.id;
            return (
              <Button
                key={topic.id}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTopic(topic.id)}
                className={`gap-2 transition-all ${
                  isSelected
                    ? topic.color + " border"
                    : "text-muted-foreground hover:text-foreground border border-transparent hover:border-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {topic.label}
              </Button>
            );
          })}
        </div>

        {/* Topic Header */}
        <div className="rounded-lg bg-gradient-to-r from-primary/10 via-transparent to-transparent border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${currentTopic.color} border`}>
              <currentTopic.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{currentTopic.label}</h3>
              <p className="text-sm text-muted-foreground">{currentTopic.description}</p>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 glass-scroll">
          {currentTopic.videos.map((video, index) => (
            <div
              key={video.id}
              className={`group rounded-lg border p-3 transition-all backdrop-blur-sm cursor-pointer ${
                playingVideo === video.id
                  ? "border-primary/50 bg-primary/10"
                  : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"
              }`}
              onClick={() => setPlayingVideo(playingVideo === video.id ? null : video.id)}
            >
              <div className="flex gap-4">
                {/* Thumbnail / Video Player */}
                <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-black/50">
                  {playingVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-silver/20 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 group-hover:bg-primary transition-colors">
                          <Play className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                        {video.duration}
                      </div>
                      <Badge className="absolute top-1 left-1 bg-black/80 text-white text-xs border-0">
                        #{index + 1}
                      </Badge>
                    </>
                  )}
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{video.channel}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center">
                  <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${
                    playingVideo === video.id ? "rotate-90" : "group-hover:translate-x-1"
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-primary">30+</div>
            <div className="text-sm text-muted-foreground">Video Lessons</div>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Topic Categories</div>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-primary">12h+</div>
            <div className="text-sm text-muted-foreground">Content</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
