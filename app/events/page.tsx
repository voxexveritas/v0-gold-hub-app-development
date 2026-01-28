import { EventCard } from "../../components/events/event-card";

const events = [
  {
    id: "1",
    name: "New York International Numismatic Convention",
    date: "January 11-14, 2026",
    location: "New York, NY",
    description: "One of the largest numismatic events in the world, featuring dealers, auctions, and educational programs.",
    imageUrl: "https://via.placeholder.com/400x200?text=NYINC",
  },
  {
    id: "2",
    name: "FUN Convention (Florida United Numismatists)",
    date: "January 18-21, 2026",
    location: "Orlando, FL",
    description: "Annual coin convention with hundreds of dealers, major auctions, and educational seminars.",
    imageUrl: "https://via.placeholder.com/400x200?text=FUN+Show",
  },
  {
    id: "3",
    name: "Long Beach Coin, Currency, Stamp & Sports Collectible Show",
    date: "February 22-24, 2026",
    location: "Long Beach, CA",
    description: "A major West Coast show covering a wide range of collectibles.",
    imageUrl: "https://via.placeholder.com/400x200?text=Long+Beach+Show",
  },
  {
    id: "4",
    name: "ANA National Money Show",
    date: "March 7-9, 2026",
    location: "Colorado Springs, CO",
    description: "Hosted by the American Numismatic Association, featuring exhibits, a bourse floor, and educational events.",
    imageUrl: "https://via.placeholder.com/400x200?text=ANA+Money+Show",
  },
  {
    id: "5",
    name: "Central States Numismatic Society Convention",
    date: "April 24-27, 2026",
    location: "Schaumburg, IL",
    description: "One of the premier numismatic events in the Midwest, offering a large bourse and educational forums.",
    imageUrl: "https://via.placeholder.com/400x200?text=Central+States",
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Upcoming Precious Metals & Collectibles Events</h1>
      <p className="text-lg mb-8">
        Discover coin shows, conventions, and other events near you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}