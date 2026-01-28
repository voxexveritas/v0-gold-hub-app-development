import { VideoCard } from "../../components/learn/video-card";

const topics = [
  "Gold Investing Basics",
  "Coin Collecting",
  "Silver Market",
  "Precious Metals History",
  "Antiques & Valuables",
];

const videos = [
  {
    id: "1",
    title: "Understanding Gold as an Investment",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topic: "Gold Investing Basics",
  },
  {
    id: "2",
    title: "Beginner's Guide to Coin Collecting",
    thumbnail: "https://img.youtube.com/vi/sZzN9L7yY4U/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=sZzN9L7yY4U",
    topic: "Coin Collecting",
  },
  {
    id: "3",
    title: "The Volatility of the Silver Market",
    thumbnail: "https://img.youtube.com/vi/qQ33qIuF_0M/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=qQ33qIuF_0M",
    topic: "Silver Market",
  },
  {
    id: "4",
    title: "A Brief History of Precious Metals",
    thumbnail: "https://img.youtube.com/vi/hp1T5Wz7y1E/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=hp1T5Wz7y1E",
    topic: "Precious Metals History",
  },
  {
    id: "5",
    title: "Identifying Valuable Antiques",
    thumbnail: "https://img.youtube.com/vi/BPNzC2v_J9M/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=BPNzC2v_J9M",
    topic: "Antiques & Valuables",
  },
];

export default function LearnPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Learn About Precious Metals & Collectibles</h1>
      <p className="text-lg mb-8">Expand your knowledge with our curated learning resources.</p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span key={topic} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}