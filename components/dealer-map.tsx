"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  Navigation,
  Star,
  Clock,
  Phone,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface Dealer {
  id: string;
  name: string;
  type: "coin_dealer" | "jewelry" | "pawn" | "bullion";
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  phone: string;
  hours: string;
  isOpen: boolean;
  lat: number;
  lng: number;
}

// Simulated dealer data - in production, use Google Places API
const generateDealers = (lat: number, lng: number): Dealer[] => {
  const types: Dealer["type"][] = ["coin_dealer", "jewelry", "pawn", "bullion"];
  const names = [
    "Golden Eagle Coins",
    "Silver State Bullion",
    "Metro Gold Exchange",
    "Premier Coin & Gold",
    "Liberty Precious Metals",
    "Crown Jewelers",
    "Heritage Gold & Silver",
    "Capital Coin Company",
    "Treasure Coast Metals",
    "Royal Mint Exchange",
  ];

  return names.map((name, i) => ({
    id: `dealer-${i}`,
    name,
    type: types[i % 4],
    address: `${100 + i * 23} Main Street, Suite ${i + 1}`,
    distance: `${(0.5 + i * 0.8).toFixed(1)} mi`,
    rating: 4.2 + Math.random() * 0.8,
    reviews: Math.floor(50 + Math.random() * 200),
    phone: `(555) ${100 + i}-${1000 + i * 11}`,
    hours: "9:00 AM - 6:00 PM",
    isOpen: Math.random() > 0.3,
    lat: lat + (Math.random() - 0.5) * 0.1,
    lng: lng + (Math.random() - 0.5) * 0.1,
  }));
};

const typeLabels: Record<Dealer["type"], string> = {
  coin_dealer: "Coin Dealer",
  jewelry: "Jewelry Store",
  pawn: "Pawn Shop",
  bullion: "Bullion Dealer",
};

const typeColors: Record<Dealer["type"], string> = {
  coin_dealer: "bg-gold/20 text-gold border-gold/30",
  jewelry: "bg-accent/20 text-accent border-accent/30",
  pawn: "bg-muted text-muted-foreground border-muted",
  bullion: "bg-silver/20 text-silver border-silver/30",
};

// Search query mapping for Google Maps
const typeSearchQueries: Record<Dealer["type"] | "all", string> = {
  all: "gold dealer OR coin shop OR jewelry store OR bullion dealer",
  coin_dealer: "coin dealer OR coin shop",
  jewelry: "jewelry store OR gold jewelry",
  pawn: "pawn shop gold silver",
  bullion: "bullion dealer OR precious metals dealer",
};

export function DealerMap() {
  const [location, setLocation] = useState("");
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    city: string;
  } | null>(null);
  const [filterType, setFilterType] = useState<Dealer["type"] | "all">("all");

  // Build Google Maps embed URL with search query
  const getMapUrl = useCallback(() => {
    if (!userLocation) return "";
    const searchQuery = typeSearchQueries[filterType];
    const query = encodeURIComponent(`${searchQuery} near ${userLocation.city}`);
    return `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}&center=${userLocation.lat},${userLocation.lng}&zoom=12`;
  }, [userLocation, filterType]);

  // Detect location via IP geolocation API
  const detectLocationByIP = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use ipapi.co for IP-based geolocation (free, no API key needed)
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      
      if (data.latitude && data.longitude) {
        const locationData = {
          lat: data.latitude,
          lng: data.longitude,
          city: `${data.city}, ${data.region_code || data.region}`,
        };
        setUserLocation(locationData);
        setLocation(locationData.city);
        setDealers(generateDealers(data.latitude, data.longitude));
      } else {
        throw new Error("No location data");
      }
    } catch {
      // Fallback to default location
      const defaultLocation = {
        lat: 40.7128,
        lng: -74.006,
        city: "New York, NY",
      };
      setUserLocation(defaultLocation);
      setLocation(defaultLocation.city);
      setDealers(generateDealers(defaultLocation.lat, defaultLocation.lng));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Try browser geolocation first, then fall back to IP
  const detectLocation = useCallback(() => {
    setIsLoading(true);

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocode to get city name
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address?.city || data.address?.town || data.address?.county || "Current Location";
            const state = data.address?.state || "";
            const locationData = {
              lat: latitude,
              lng: longitude,
              city: state ? `${city}, ${state}` : city,
            };
            setUserLocation(locationData);
            setLocation(locationData.city);
            setDealers(generateDealers(latitude, longitude));
          } catch {
            setUserLocation({ lat: latitude, lng: longitude, city: "Current Location" });
            setLocation("Current Location");
            setDealers(generateDealers(latitude, longitude));
          }
          setIsLoading(false);
        },
        () => {
          // Geolocation denied or failed, use IP detection
          detectLocationByIP();
        },
        { timeout: 5000 }
      );
    } else {
      detectLocationByIP();
    }
  }, [detectLocationByIP]);

  // Detect location on mount
  useEffect(() => {
    detectLocationByIP(); // Start with IP detection for immediate results
  }, [detectLocationByIP]);

  const searchLocation = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!location.trim()) return;

    setIsLoading(true);
    // Simulate geocoding - in production use Google Geocoding API
    setTimeout(() => {
      // Generate coords based on some common cities
      const cityCoords: Record<string, { lat: number; lng: number }> = {
        "new york": { lat: 40.7128, lng: -74.006 },
        "los angeles": { lat: 34.0522, lng: -118.2437 },
        "chicago": { lat: 41.8781, lng: -87.6298 },
        "houston": { lat: 29.7604, lng: -95.3698 },
        "phoenix": { lat: 33.4484, lng: -112.074 },
        "miami": { lat: 25.7617, lng: -80.1918 },
        "dallas": { lat: 32.7767, lng: -96.797 },
        "atlanta": { lat: 33.749, lng: -84.388 },
      };
      
      const searchLower = location.toLowerCase();
      const matched = Object.entries(cityCoords).find(([city]) => 
        searchLower.includes(city)
      );
      
      const coords = matched ? matched[1] : { 
        lat: 40.7128 + (Math.random() - 0.5) * 20, 
        lng: -74.006 + (Math.random() - 0.5) * 40 
      };
      
      setUserLocation({ ...coords, city: location });
      setDealers(generateDealers(coords.lat, coords.lng));
      setIsLoading(false);
    }, 500);
  };

  const filteredDealers =
    filterType === "all"
      ? dealers
      : dealers.filter((d) => d.type === filterType);

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          Find Dealers Near You
        </CardTitle>

        {/* Search Form */}
        <form onSubmit={searchLocation} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter city, state, or ZIP code..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={detectLocation}
            title="Use my location"
            className="border-white/10 hover:bg-white/10 bg-transparent"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </form>

        {/* Filter Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={filterType === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilterType("all")}
            className={`text-xs ${filterType !== "all" ? "border border-white/10 hover:bg-white/10" : ""}`}
          >
            All
          </Button>
          {(Object.keys(typeLabels) as Dealer["type"][]).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilterType(type)}
              className={`text-xs ${filterType !== type ? "border border-white/10 hover:bg-white/10" : ""}`}
            >
              {typeLabels[type]}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Google Maps Embed */}
        <div className="relative mb-4 h-64 overflow-hidden rounded-lg border border-white/10">
          {isLoading ? (
            <div className="flex h-full items-center justify-center bg-white/5">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Detecting your location...</p>
              </div>
            </div>
          ) : userLocation ? (
            <iframe
              title="Dealer Map"
              src={getMapUrl()}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-white/5">
              <p className="text-muted-foreground">Enter a location to view map</p>
            </div>
          )}
        </div>

        {/* Dealer List */}
        <div className="max-h-80 space-y-3 overflow-y-auto pr-2 glass-scroll">
          {filteredDealers.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No dealers found in this area. Try a different location.
            </p>
          ) : (
            filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                onClick={() => setSelectedDealer(dealer)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedDealer(dealer);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`cursor-pointer rounded-lg border p-3 transition-all backdrop-blur-sm ${
                  selectedDealer?.id === dealer.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold text-foreground">
                        {dealer.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs ${typeColors[dealer.type]}`}
                      >
                        {typeLabels[dealer.type]}
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {dealer.address}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        <span className="text-foreground">
                          {dealer.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({dealer.reviews})
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span
                          className={
                            dealer.isOpen ? "text-success" : "text-destructive"
                          }
                        >
                          {dealer.isOpen ? "Open" : "Closed"}
                        </span>
                      </span>
                      <span className="text-muted-foreground">
                        {dealer.distance}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${dealer.phone}`);
                      }}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(dealer.name + " " + dealer.address)}`
                        );
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
