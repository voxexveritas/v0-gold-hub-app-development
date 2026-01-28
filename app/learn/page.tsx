import { VideoCard } from "../../components/learn/video-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import Card components

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: string;
}

const learningContent: Record<string, Video[]> = {
  Gold: [
    {
      id: "g1",
      title: "The Basics of Gold Investing",
      thumbnail: "https://via.placeholder.com/300x150?text=Gold+Basics",
      url: "https://www.youtube.com/watch?v=gold-basics",
      category: "Gold",
    },
    {
      id: "g2",
      title: "Understanding Gold Futures Market",
      thumbnail: "https://via.placeholder.com/300x150?text=Gold+Futures",
      url: "https://www.youtube.com/watch?v=gold-futures",
      category: "Gold",
    },
    {
      id: "g3",
      title: "Physical Gold vs. Gold ETFs",
      thumbnail: "https://via.placeholder.com/300x150?text=Gold+ETFs",
      url: "https://www.youtube.com/watch?v=gold-etfs",
      category: "Gold",
    },
    {
      id: "g4",
      title: "History of Gold as Currency",
      thumbnail: "https://via.placeholder.com/300x150?text=Gold+History",
      url: "https://www.youtube.com/watch?v=gold-history",
      category: "Gold",
    },
    {
      id: "g5",
      title: "Factors Influencing Gold Prices",
      thumbnail: "https://via.placeholder.com/300x150?text=Gold+Prices",
      url: "https://www.youtube.com/watch?v=gold-factors",
      category: "Gold",
    },
  ],
  Silver: [
    {
      id: "s1",
      title: "Investing in Silver: A Comprehensive Guide",
      thumbnail: "https://via.placeholder.com/300x150?text=Silver+Guide",
      url: "https://www.youtube.com/watch?v=silver-guide",
      category: "Silver",
    },
    {
      id: "s2",
      title: "Industrial Demand for Silver",
      thumbnail: "https://via.placeholder.com/300x150?text=Silver+Demand",
      url: "https://www.youtube.com/watch?v=silver-demand",
      category: "Silver",
    },
    {
      id: "s3",
      title: "Silver vs. Gold: Which is a Better Investment?",
      thumbnail: "https://via.placeholder.com/300x150?text=Silver+vs+Gold",
      url: "https://www.youtube.com/watch?v=silver-gold",
      category: "Silver",
    },
    {
      id: "s4",
      title: "Collecting Silver Coins for Beginners",
      thumbnail: "https://via.placeholder.com/300x150?text=Silver+Coins",
      url: "https://www.youtube.com/watch?v=silver-coins",
      category: "Silver",
    },
    {
      id: "s5",
      title: "The Volatility and Opportunities in Silver",
      thumbnail: "https://via.placeholder.com/300x150?text=Silver+Volatility",
      url: "https://www.youtube.com/watch?v=silver-volatility",
      category: "Silver",
    },
  ],
  Palladium: [
    {
      id: "p1",
      title: "Palladium Investing: What You Need to Know",
      thumbnail: "https://via.placeholder.com/300x150?text=Palladium+Investing",
      url: "https://www.youtube.com/watch?v=palladium-investing",
      category: "Palladium",
    },
    {
      id: "p2",
      title: "The Role of Palladium in Catalytic Converters",
      thumbnail: "https://via.placeholder.com/300x150?text=Palladium+Auto",
      url: "https://www.youtube.com/watch?v=palladium-auto",
      category: "Palladium",
    },
    {
      id: "p3",
      title: "Palladium Market Trends and Forecasts",
      thumbnail: "https://via.placeholder.com/300x150?text=Palladium+Trends",
      url: "https://www.youtube.com/watch?v=palladium-trends",
      category: "Palladium",
    },
    {
      id: "p4",
      title: "Why Palladium is a Precious Metal",
      thumbnail: "https://via.placeholder.com/300x150?text=Precious+Palladium",
      url: "https://www.youtube.com/watch?v=palladium-precious",
      category: "Palladium",
    },
    {
      id: "p5",
      title: "Mining and Supply of Palladium",
      thumbnail: "https://via.placeholder.com/300x150?text=Palladium+Mining",
      url: "https://www.youtube.com/watch?v=palladium-mining",
      category: "Palladium",
    },
  ],
  "Rare Coins": [
    {
      id: "rc1",
      title: "Introduction to Rare Coin Collecting",
      thumbnail: "https://via.placeholder.com/300x150?text=Rare+Coins+Intro",
      url: "https://www.youtube.com/watch?v=rare-coin-intro",
      category: "Rare Coins",
    },
    {
      id: "rc2",
      title: "Identifying Valuable Error Coins",
      thumbnail: "https://via.placeholder.com/300x150?text=Error+Coins",
      url: "https://www.youtube.com/watch?v=error-coins",
      category: "Rare Coins",
    },
    {
      id: "rc3",
      title: "Grading Your Precious Coins",
      thumbnail: "https://via.placeholder.com/300x150?text=Coin+Grading",
      url: "https://www.youtube.com/watch?v=coin-grading",
      category: "Rare Coins",
    },
    {
      id: "rc4",
      title: "The Most Expensive Coins Ever Sold",
      thumbnail: "https://via.placeholder.com/300x150?text=Expensive+Coins",
      url: "https://www.youtube.com/watch?v=expensive-coins",
      category: "Rare Coins",
    },
    {
      id: "rc5",
      title: "Investing in Rare Coins: Risks and Rewards",
      thumbnail: "https://via.placeholder.com/300x150?text=Rare+Coin+Investing",
      url: "https://www.youtube.com/watch?v=rare-coin-investing",
      category: "Rare Coins",
    },
  ],
  Antiques: [
    {
      id: "a1",
      title: "Beginner's Guide to Antique Collecting",
      thumbnail: "https://via.placeholder.com/300x150?text=Antique+Guide",
      url: "https://www.youtube.com/watch?v=antique-guide",
      category: "Antiques",
    },
    {
      id: "a2",
      title: "How to Identify Authentic Antiques",
      thumbnail: "https://via.placeholder.com/300x150?text=Authentic+Antiques",
      url: "https://www.youtube.com/watch?v=authentic-antiques",
      category: "Antiques",
    },
    {
      id: "a3",
      title: "Restoring and Preserving Antiques",
      thumbnail: "https://via.placeholder.com/300x150?text=Antique+Restore",
      url: "https://www.youtube.com/watch?v=antique-restore",
      category: "Antiques",
    },
    {
      id: "a4",
      title: "Valuing Your Antiques: What to Look For",
      thumbnail: "https://via.placeholder.com/300x150?text=Antique+Value",
      url: "https://www.youtube.com/watch?v=antique-value",
      category: "Antiques",
    },
    {
      id: "a5",
      title: "Famous Antique Discoveries",
      thumbnail: "https://via.placeholder.com/300x150?text=Antique+Discoveries",
      url: "https://www.youtube.com/watch?v=antique-discoveries",
      category: "Antiques",
    },
  ],
};

export default function LearnPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Learn About Precious Metals & Collectibles</h1>
      <p className="text-lg mb-8 text-muted-foreground">Expand your knowledge with our curated learning resources across various categories.</p>

      {Object.entries(learningContent).map(([category, videos]) => (
        <Card key={category} className="glass-card mb-8">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-2xl font-bold text-foreground">{category}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}