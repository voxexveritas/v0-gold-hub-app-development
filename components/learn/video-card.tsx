import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Assuming AspectRatio component exists or needs creation

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    url: string; // Full YouTube URL
    category: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0&rel=0` : "";
  };

  const embedUrl = getYouTubeEmbedUrl(video.url);

  return (
    <Card className="glass-card overflow-hidden rounded-xl min-w-[300px]">
      <AspectRatio ratio={16 / 9}>
        {embedUrl ? (
          <iframe
            className="w-full h-full rounded-t-xl"
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-t-xl" />
        )}
      </AspectRatio>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 text-foreground">{video.title}</h3>
        <p className="text-xs text-muted-foreground">{video.category}</p>
      </CardContent>
    </Card>
  );
}