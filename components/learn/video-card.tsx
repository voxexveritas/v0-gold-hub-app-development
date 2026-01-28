interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    topic: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      </a>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{video.category}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
}