import { EventCard } from "../../components/events/event-card";
import { EventMap } from "../../components/events/event-map";
import { AddEventForm } from "../../components/events/add-event-form";

const events = [
  {
    id: "1",
    name: "New York International Numismatic Convention",
    date: "January 11-14, 2026",
    location: "New York, NY",
    description: "One of the largest numismatic events in the world, featuring dealers, auctions, and educational programs.",
    imageUrl: "https://via.placeholder.com/400x200?text=NYINC",
    lat: 40.7128, // Example Latitude
    lng: -74.0060, // Example Longitude
  },
  {
    id: "2",
    name: "FUN Convention (Florida United Numismatists)",
    date: "January 18-21, 2026",
    location: "Orlando, FL",
    description: "Annual coin convention with hundreds of dealers, major auctions, and educational seminars.",
    imageUrl: "https://via.placeholder.com/400x200?text=FUN+Show",
    lat: 28.5383, // Example Latitude
    lng: -81.3792, // Example Longitude
  },
  {
    id: "3",
    name: "Long Beach Coin, Currency, Stamp & Sports Collectible Show",
    date: "February 22-24, 2026",
    location: "Long Beach, CA",
    description: "A major West Coast show covering a wide range of collectibles.",
    imageUrl: "https://via.placeholder.com/400x200?text=Long+Beach+Show",
    lat: 33.7701, // Example Latitude
    lng: -118.1937, // Example Longitude
  },
  {
    id: "4",
    name: "ANA National Money Show",
    date: "March 7-9, 2026",
    location: "Colorado Springs, CO",
    description: "Hosted by the American Numismatic Association, featuring exhibits, a bourse floor, and educational events.",
    imageUrl: "https://via.placeholder.com/400x200?text=ANA+Money+Show",
    lat: 38.8375, // Example Latitude
    lng: -104.8214, // Example Longitude
  },
  {
    id: "5",
    name: "Central States Numismatic Society Convention",
    date: "April 24-27, 2026",
    location: "Schaumburg, IL",
    description: "One of the premier numismatic events in the Midwest, offering a large bourse and educational forums.",
    imageUrl: "https://via.placeholder.com/400x200?text=Central+States",
    lat: 42.0304, // Example Latitude
    lng: -88.0558, // Example Longitude
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Upcoming Precious Metals & Collectibles Events</h1>
      <p className="text-lg mb-8">
        Discover coin shows, conventions, and other events near you, and add your own!
      </p>

      <div className="mb-12">
        <EventMap />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div>
        <AddEventForm />
      </div>
    </div>
  );
}