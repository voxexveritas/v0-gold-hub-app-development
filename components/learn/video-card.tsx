import { Card, CardContent } from "@/components/ui/card"; // Import Card components

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    category: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        <img src={video.thumbnail} alt={video.title} className="w-full h-36 object-cover" />
      </a>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 text-foreground">{video.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{video.category}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-1.5 px-3 rounded text-sm"
        >
          Watch Video
        </a>
      </CardContent>
    </Card>
  );
}