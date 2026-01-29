import { Card, CardContent } from "@/components/ui/card"; // Import Card components

interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
    lat: number;
    lng: number;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="glass-card overflow-hidden rounded-xl">
      <img src={event.imageUrl} alt={event.name} className="w-full h-36 object-cover" />
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 text-foreground">{event.name}</h3>
        <p className="text-xs text-muted-foreground mb-1">
          <strong>Date:</strong> {event.date}
        </p>
        <p className="text-xs text-muted-foreground mb-2">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-foreground text-sm">{event.description}</p>
      </CardContent>
    </Card>
  );
}