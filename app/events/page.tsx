"use client";

import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { EventMap } from "../../components/events/event-map";
import { AddEventForm } from "../../components/events/add-event-form";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  attendees?: number;
  featured?: boolean;
}

const events: Event[] = [
  {
    id: "1",
    name: "ANA National Money Show",
    date: "March 7-9, 2026",
    location: "Colorado Springs, CO",
    description: "Hosted by the American Numismatic Association, featuring exhibits, a bourse floor, and educational events. The premier educational numismatic event.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    lat: 38.8375,
    lng: -104.8214,
    attendees: 10000,
    featured: true,
  },
  {
    id: "2",
    name: "Central States Numismatic Society Convention",
    date: "April 24-27, 2026",
    location: "Schaumburg, IL",
    description: "One of the premier numismatic events in the Midwest, offering a large bourse floor, major auctions, and educational forums.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    lat: 42.0304,
    lng: -88.0558,
    attendees: 7500,
    featured: true,
  },
  {
    id: "3",
    name: "New York International Numismatic Convention",
    date: "January 11-14, 2026",
    location: "New York, NY",
    description: "One of the largest numismatic events in the world, featuring dealers, auctions, and educational programs.",
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    lat: 40.7128,
    lng: -74.006,
    attendees: 15000,
    featured: true,
  },
  {
    id: "4",
    name: "FUN Convention (Florida United Numismatists)",
    date: "January 18-21, 2026",
    location: "Orlando, FL",
    description: "Annual coin convention with hundreds of dealers, major auctions, and educational seminars.",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    lat: 28.5383,
    lng: -81.3792,
    attendees: 12000,
    featured: true,
  },
  {
    id: "5",
    name: "Long Beach Coin, Currency & Collectible Show",
    date: "February 22-24, 2026",
    location: "Long Beach, CA",
    description: "A major West Coast show covering a wide range of collectibles including coins, currency, and stamps.",
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    lat: 33.7701,
    lng: -118.1937,
    attendees: 8000,
  },
];

function FeaturedEventCard({ event, isActive }: { event: Event; isActive: boolean }) {
  return (
    <div
      className={`relative flex-shrink-0 w-full md:w-[400px] transition-all duration-500 ${
        isActive ? "opacity-100 scale-100" : "opacity-60 scale-95"
      }`}
    >
      <div className="relative h-[400px] md:h-[480px] rounded-3xl overflow-hidden group">
        {/* Background Image */}
        <img
          src={event.imageUrl}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Featured
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">{event.date}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
            {event.name}
          </h3>
          <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
            {event.attendees && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {event.attendees.toLocaleString()}+ attendees
              </div>
            )}
          </div>
          <p className="text-white/70 text-sm line-clamp-2 mb-4">
            {event.description}
          </p>
          <Button 
            className="bg-white text-background hover:bg-white/90 rounded-full px-6 group/btn"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EventListCard({ event }: { event: Event }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 md:bg-gradient-to-b" />
        </div>
        {/* Content */}
        <div className="flex-1 p-5 md:p-6">
          <div className="flex items-center gap-4 text-sm mb-3">
            <div className="flex items-center gap-1.5 text-primary">
              <Calendar className="h-4 w-4" />
              {event.date}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {event.description}
          </p>
          <div className="flex items-center justify-between">
            {event.attendees && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {event.attendees.toLocaleString()}+ expected
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary hover:bg-primary/10 rounded-full"
            >
              Learn More
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const featuredEvents = events.filter((e) => e.featured);
  const upcomingEvents = events.filter((e) => !e.featured);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-silver/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-silver/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <MobileNav />

      <main className="mx-auto max-w-7xl px-4 py-8 pb-24 md:pb-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-silver/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative flex items-start gap-4">
              <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-gold-light shadow-lg shadow-primary/30">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Events Calendar</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Discover <span className="text-primary">Coin Shows</span> & Conventions
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
                  Connect with collectors, dealers, and experts at premier numismatic events across the nation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events Carousel */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured Events</h2>
              <p className="text-sm text-muted-foreground mt-1">Don't miss these premier shows</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * (100 / featuredEvents.length)}%)` }}
            >
              {featuredEvents.map((event, index) => (
                <FeaturedEventCard 
                  key={event.id} 
                  event={event} 
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Event Map */}
        <section className="mb-12">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Event Locations</h2>
                <p className="text-sm text-muted-foreground">Find events near you</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <EventMap />
            </div>
          </div>
        </section>

        {/* Upcoming Events List */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">More Upcoming Events</h2>
              <p className="text-sm text-muted-foreground mt-1">{upcomingEvents.length} events coming up</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {upcomingEvents.map((event) => (
              <EventListCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Suggest Event Section */}
        <section>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Know an Event?</h2>
                  <p className="text-sm text-muted-foreground">Help the community by sharing upcoming events</p>
                </div>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className={showForm ? "bg-muted text-muted-foreground hover:bg-muted/80" : ""}
              >
                {showForm ? "Cancel" : "Suggest an Event"}
              </Button>
            </div>
            {showForm && (
              <div className="pt-4 border-t border-white/10">
                <AddEventForm />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
