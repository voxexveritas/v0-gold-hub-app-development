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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Date:</strong> {event.date}
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-gray-700 text-sm">{event.description}</p>
      </div>
    </div>
  );
}