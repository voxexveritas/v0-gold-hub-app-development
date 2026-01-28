import { VideoCard } from "../../components/learn/video-card";

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
      thumbnail: "https://img.youtube.com/vi/gold-basics/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=gold-basics",
      category: "Gold",
    },
    {
      id: "g2",
      title: "Understanding Gold Futures Market",
      thumbnail: "https://img.youtube.com/vi/gold-futures/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=gold-futures",
      category: "Gold",
    },
    {
      id: "g3",
      title: "Physical Gold vs. Gold ETFs",
      thumbnail: "https://img.youtube.com/vi/gold-etfs/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=gold-etfs",
      category: "Gold",
    },
    {
      id: "g4",
      title: "History of Gold as Currency",
      thumbnail: "https://img.youtube.com/vi/gold-history/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=gold-history",
      category: "Gold",
    },
    {
      id: "g5",
      title: "Factors Influencing Gold Prices",
      thumbnail: "https://img.youtube.com/vi/gold-factors/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=gold-factors",
      category: "Gold",
    },
  ],
  Silver: [
    {
      id: "s1",
      title: "Investing in Silver: A Comprehensive Guide",
      thumbnail: "https://img.youtube.com/vi/silver-guide/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=silver-guide",
      category: "Silver",
    },
    {
      id: "s2",
      title: "Industrial Demand for Silver",
      thumbnail: "https://img.youtube.com/vi/silver-demand/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=silver-demand",
      category: "Silver",
    },
    {
      id: "s3",
      title: "Silver vs. Gold: Which is a Better Investment?",
      thumbnail: "https://img.youtube.com/vi/silver-gold/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=silver-gold",
      category: "Silver",
    },
    {
      id: "s4",
      title: "Collecting Silver Coins for Beginners",
      thumbnail: "https://img.youtube.com/vi/silver-coins/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=silver-coins",
      category: "Silver",
    },
    {
      id: "s5",
      title: "The Volatility and Opportunities in Silver",
      thumbnail: "https://img.youtube.com/vi/silver-volatility/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=silver-volatility",
      category: "Silver",
    },
  ],
  Palladium: [
    {
      id: "p1",
      title: "Palladium Investing: What You Need to Know",
      thumbnail: "https://img.youtube.com/vi/palladium-investing/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=palladium-investing",
      category: "Palladium",
    },
    {
      id: "p2",
      title: "The Role of Palladium in Catalytic Converters",
      thumbnail: "https://img.youtube.com/vi/palladium-auto/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=palladium-auto",
      category: "Palladium",
    },
    {
      id: "p3",
      title: "Palladium Market Trends and Forecasts",
      thumbnail: "https://img.youtube.com/vi/palladium-trends/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=palladium-trends",
      category: "Palladium",
    },
    {
      id: "p4",
      title: "Why Palladium is a Precious Metal",
      thumbnail: "https://img.youtube.com/vi/palladium-precious/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=palladium-precious",
      category: "Palladium",
    },
    {
      id: "p5",
      title: "Mining and Supply of Palladium",
      thumbnail: "https://img.youtube.com/vi/palladium-mining/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=palladium-mining",
      category: "Palladium",
    },
  ],
  "Rare Coins": [
    {
      id: "rc1",
      title: "Introduction to Rare Coin Collecting",
      thumbnail: "https://img.youtube.com/vi/rare-coin-intro/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=rare-coin-intro",
      category: "Rare Coins",
    },
    {
      id: "rc2",
      title: "Identifying Valuable Error Coins",
      thumbnail: "https://img.youtube.com/vi/error-coins/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=error-coins",
      category: "Rare Coins",
    },
    {
      id: "rc3",
      title: "Grading Your Precious Coins",
      thumbnail: "https://img.youtube.com/vi/coin-grading/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=coin-grading",
      category: "Rare Coins",
    },
    {
      id: "rc4",
      title: "The Most Expensive Coins Ever Sold",
      thumbnail: "https://img.youtube.com/vi/expensive-coins/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=expensive-coins",
      category: "Rare Coins",
    },
    {
      id: "rc5",
      title: "Investing in Rare Coins: Risks and Rewards",
      thumbnail: "https://img.youtube.com/vi/rare-coin-investing/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=rare-coin-investing",
      category: "Rare Coins",
    },
  ],
  Antiques: [
    {
      id: "a1",
      title: "Beginner's Guide to Antique Collecting",
      thumbnail: "https://img.youtube.com/vi/antique-guide/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=antique-guide",
      category: "Antiques",
    },
    {
      id: "a2",
      title: "How to Identify Authentic Antiques",
      thumbnail: "https://img.youtube.com/vi/authentic-antiques/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=authentic-antiques",
      category: "Antiques",
    },
    {
      id: "a3",
      title: "Restoring and Preserving Antiques",
      thumbnail: "https://img.youtube.com/vi/antique-restore/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=antique-restore",
      category: "Antiques",
    },
    {
      id: "a4",
      title: "Valuing Your Antiques: What to Look For",
      thumbnail: "https://img.youtube.com/vi/antique-value/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=antique-value",
      category: "Antiques",
    },
    {
      id: "a5",
      title: "Famous Antique Discoveries",
      thumbnail: "https://img.youtube.com/vi/antique-discoveries/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=antique-discoveries",
      category: "Antiques",
    },
  ],
};

export default function LearnPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Learn About Precious Metals & Collectibles</h1>
      <p className="text-lg mb-8">Expand your knowledge with our curated learning resources across various categories.</p>

      {Object.entries(learningContent).map(([category, videos]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}