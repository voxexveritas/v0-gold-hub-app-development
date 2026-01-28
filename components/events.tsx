"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Search,
  Star,
  Ticket,
  Building,
} from "lucide-react";

type EventType = "coin-show" | "convention" | "auction" | "expo";

interface Event {
  id: string;
  name: string;
  type: EventType;
  startDate: string;
  endDate: string;
  location: {
    venue: string;
    city: string;
    state: string;
  };
  description: string;
  website: string;
  featured: boolean;
  expectedAttendees: string;
  dealers: string;
  admission: string;
}

// Real coin show events data
const events: Event[] = [
  {
    id: "1",
    name: "National Money Show 2026",
    type: "convention",
    startDate: "February 26, 2026",
    endDate: "February 28, 2026",
    location: {
      venue: "Savannah Convention Center",
      city: "Savannah",
      state: "GA",
    },
    description: "The ANA National Money Show features hundreds of dealers, educational programs, exhibits of rare coins and currency, and the opportunity to have your coins authenticated and graded on-site.",
    website: "https://www.money.org",
    featured: true,
    expectedAttendees: "10,000+",
    dealers: "500+",
    admission: "$8 - $20",
  },
  {
    id: "2",
    name: "World's Fair of Money 2026",
    type: "convention",
    startDate: "August 25, 2026",
    endDate: "August 29, 2026",
    location: {
      venue: "David L. Lawrence Convention Center",
      city: "Pittsburgh",
      state: "PA",
    },
    description: "The ANA World's Fair of Money is the largest annual numismatic event in the world, featuring over 1,000 dealers, major auctions, educational seminars, and the Museum Showcase.",
    website: "https://www.money.org",
    featured: true,
    expectedAttendees: "25,000+",
    dealers: "1,000+",
    admission: "$10 - $25",
  },
  {
    id: "3",
    name: "FUN Convention",
    type: "convention",
    startDate: "January 8, 2026",
    endDate: "January 11, 2026",
    location: {
      venue: "Orange County Convention Center",
      city: "Orlando",
      state: "FL",
    },
    description: "Florida United Numismatists hosts one of the largest numismatic conventions in the country, featuring Heritage Auctions, educational forums, and hundreds of dealers.",
    website: "https://www.funtopics.com",
    featured: true,
    expectedAttendees: "15,000+",
    dealers: "600+",
    admission: "$5 - $15",
  },
  {
    id: "4",
    name: "Long Beach Coin Expo",
    type: "expo",
    startDate: "February 5, 2026",
    endDate: "February 7, 2026",
    location: {
      venue: "Long Beach Convention Center",
      city: "Long Beach",
      state: "CA",
    },
    description: "One of the most prestigious numismatic events on the West Coast, featuring rare coins, precious metals, paper money, and collectibles from over 500 dealers.",
    website: "https://www.longbeachexpo.com",
    featured: false,
    expectedAttendees: "12,000+",
    dealers: "500+",
    admission: "Free - $15",
  },
  {
    id: "5",
    name: "Whitman Coin & Collectibles Expo",
    type: "expo",
    startDate: "March 12, 2026",
    endDate: "March 15, 2026",
    location: {
      venue: "Baltimore Convention Center",
      city: "Baltimore",
      state: "MD",
    },
    description: "The Baltimore Whitman Expo is a premier destination for coin collectors, featuring major auctions from Stack's Bowers and a massive bourse floor.",
    website: "https://www.whitmanexpo.com",
    featured: false,
    expectedAttendees: "8,000+",
    dealers: "400+",
    admission: "$8 - $18",
  },
  {
    id: "6",
    name: "Central States Numismatic Society Convention",
    type: "convention",
    startDate: "April 22, 2026",
    endDate: "April 25, 2026",
    location: {
      venue: "Schaumburg Convention Center",
      city: "Schaumburg",
      state: "IL",
    },
    description: "CSNS hosts an annual convention that draws collectors and dealers from across the Midwest, featuring educational programs and a large bourse area.",
    website: "https://www.centralstatesnumismaticsociety.org",
    featured: false,
    expectedAttendees: "6,000+",
    dealers: "300+",
    admission: "$5 - $12",
  },
  {
    id: "7",
    name: "Heritage Auctions Signature Sale",
    type: "auction",
    startDate: "January 15, 2026",
    endDate: "January 18, 2026",
    location: {
      venue: "Heritage Auctions HQ",
      city: "Dallas",
      state: "TX",
    },
    description: "Heritage Auctions' flagship numismatic auction event featuring rare coins, currency, and bullion with live bidding and online participation.",
    website: "https://www.ha.com",
    featured: false,
    expectedAttendees: "2,000+",
    dealers: "N/A",
    admission: "Free (Registration Required)",
  },
  {
    id: "8",
    name: "Denver Coin Expo",
    type: "coin-show",
    startDate: "May 14, 2026",
    endDate: "May 16, 2026",
    location: {
      venue: "National Western Complex",
      city: "Denver",
      state: "CO",
    },
    description: "The Denver Coin Expo brings together collectors and dealers in the Rocky Mountain region for three days of buying, selling, and numismatic education.",
    website: "https://www.rockymtncoin.com",
    featured: false,
    expectedAttendees: "4,000+",
    dealers: "200+",
    admission: "$5 - $10",
  },
  {
    id: "9",
    name: "PCGS Members Only Show",
    type: "coin-show",
    startDate: "June 18, 2026",
    endDate: "June 20, 2026",
    location: {
      venue: "Santa Clara Convention Center",
      city: "Santa Clara",
      state: "CA",
    },
    description: "PCGS hosts an exclusive members-only event featuring on-site grading, expert speakers, and a curated selection of dealers and auction lots.",
    website: "https://www.pcgs.com",
    featured: false,
    expectedAttendees: "3,000+",
    dealers: "150+",
    admission: "Members Only",
  },
  {
    id: "10",
    name: "New York International Numismatic Convention",
    type: "convention",
    startDate: "December 4, 2026",
    endDate: "December 6, 2026",
    location: {
      venue: "Marriott Marquis Times Square",
      city: "New York",
      state: "NY",
    },
    description: "NYINC is a world-renowned convention focusing on ancient and world coins, attracting international dealers and collectors to the heart of Manhattan.",
    website: "https://www.nyinc.info",
    featured: false,
    expectedAttendees: "5,000+",
    dealers: "200+",
    admission: "$10 - $25",
  },
];

export function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<EventType | "all">("all");
  const [filterState, setFilterState] = useState<string>("all");

  const states = [...new Set(events.map((e) => e.location.state))].sort();

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    const matchesState = filterState === "all" || event.location.state === filterState;
    return matchesSearch && matchesType && matchesState;
  });

  const getTypeLabel = (type: EventType) => {
    switch (type) {
      case "coin-show":
        return "Coin Show";
      case "convention":
        return "Convention";
      case "auction":
        return "Auction";
      case "expo":
        return "Expo";
    }
  };

  const getTypeColor = (type: EventType) => {
    switch (type) {
      case "coin-show":
        return "bg-gold/20 text-gold border-gold/30";
      case "convention":
        return "bg-primary/20 text-primary border-primary/30";
      case "auction":
        return "bg-success/20 text-success border-success/30";
      case "expo":
        return "bg-silver/20 text-silver border-silver/30";
    }
  };

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              Events
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Coin shows, conventions, and numismatic events
            </p>
          </div>
          <Badge className="bg-gold/20 text-gold border-gold/30 self-start sm:self-auto">
            {filteredEvents.length} Events in 2026
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/10 pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={(v) => setFilterType(v as EventType | "all")}>
              <SelectTrigger className="w-36 bg-white/5 border-white/10">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="convention">Conventions</SelectItem>
                <SelectItem value="coin-show">Coin Shows</SelectItem>
                <SelectItem value="expo">Expos</SelectItem>
                <SelectItem value="auction">Auctions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterState} onValueChange={setFilterState}>
              <SelectTrigger className="w-28 bg-white/5 border-white/10">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Events Banner */}
        <div className="rounded-lg bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-gold fill-gold" />
            <h3 className="font-semibold text-foreground">Featured Events</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Don&apos;t miss the biggest numismatic events of 2026
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 glass-scroll">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`rounded-lg border p-4 transition-all backdrop-blur-sm ${
                event.featured
                  ? "border-gold/30 bg-gold/5"
                  : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {event.featured && (
                      <Badge className="bg-gold/20 text-gold border-gold/30 text-xs">
                        <Star className="mr-1 h-3 w-3 fill-gold" />
                        Featured
                      </Badge>
                    )}
                    <Badge className={`${getTypeColor(event.type)} text-xs border`}>
                      {getTypeLabel(event.type)}
                    </Badge>
                  </div>

                  {/* Event Name */}
                  <h3 className="font-semibold text-lg text-foreground">{event.name}</h3>

                  {/* Date & Location */}
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.startDate} - {event.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location.city}, {event.location.state}</span>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{event.location.venue}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{event.expectedAttendees} Attendees</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ticket className="h-3 w-3" />
                      <span>{event.dealers} Dealers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Admission: {event.admission}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:items-end">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.open(event.website, "_blank")}
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Visit Website
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/10 hover:bg-white/10 bg-transparent"
                    onClick={() => {
                      const query = encodeURIComponent(
                        `${event.location.venue} ${event.location.city} ${event.location.state}`
                      );
                      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
                    }}
                  >
                    <MapPin className="mr-1 h-4 w-4" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No events found matching your criteria.</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xl font-bold text-primary">{events.length}</div>
            <div className="text-xs text-muted-foreground">Total Events</div>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xl font-bold text-gold">{events.filter(e => e.type === "convention").length}</div>
            <div className="text-xs text-muted-foreground">Conventions</div>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xl font-bold text-silver">{states.length}</div>
            <div className="text-xs text-muted-foreground">States</div>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xl font-bold text-success">{events.filter(e => e.featured).length}</div>
            <div className="text-xs text-muted-foreground">Featured</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
