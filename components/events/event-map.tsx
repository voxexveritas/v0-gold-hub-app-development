"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Navigation, Loader2 } from "lucide-react";

interface EventLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
}

// Simulated event locations - in production, use a real geocoding service
const generateEventLocations = (centerLat: number, centerLng: number): EventLocation[] => {
  const eventNames = [
    "Numismatic Convention",
    "Coin & Currency Show",
    "Antique & Collectibles Fair",
    "Precious Metals Expo",
    "Rare Coin Auction",
  ];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: `event-${i}`,
    name: `${eventNames[i % eventNames.length]} in ${["North", "South", "East", "West"][i % 4]} City`,
    lat: centerLat + (Math.random() - 0.5) * 0.5,
    lng: centerLng + (Math.random() - 0.5) * 0.5,
    city: `${["Springfield", "Centerville", "Riverside", "Brookside"][i % 4]}, USA`,
  }));
};

export function EventMap() {
  const [location, setLocation] = useState("");
  const [eventLocations, setEventLocations] = useState<EventLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    city: string;
  } | null>(null);

  const getMapUrl = useCallback(() => {
    if (!userLocation) return "";
    const eventsQuery = eventLocations.map(e => `${e.name} ${e.city}`).join(" OR ");
    const query = encodeURIComponent(`events: ${eventsQuery} near ${userLocation.city}`);
    return `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}&center=${userLocation.lat},${userLocation.lng}&zoom=8`;
  }, [userLocation, eventLocations]);

  const detectLocationByIP = useCallback(async () => {
    setIsLoading(true);
    try {
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
        setEventLocations(generateEventLocations(data.latitude, data.longitude));
      } else {
        throw new Error("No location data");
      }
    } catch {
      const defaultLocation = {
        lat: 39.8283,
        lng: -98.5795,
        city: "United States",
      };
      setUserLocation(defaultLocation);
      setLocation(defaultLocation.city);
      setEventLocations(generateEventLocations(defaultLocation.lat, defaultLocation.lng));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    detectLocationByIP();
  }, [detectLocationByIP]);

  const searchLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Simulate geocoding
      const defaultCoords = { lat: 39.8283, lng: -98.5795 };
      setUserLocation({ ...defaultCoords, city: location });
      setEventLocations(generateEventLocations(defaultCoords.lat, defaultCoords.lng));
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-4"> { /* Removed Card wrapper as it's handled in parent */}
      <div className="relative flex-1">
        <form onSubmit={searchLocation} className="flex gap-2">
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
            onClick={detectLocationByIP}
            title="Use my location"
            className="border-white/10 hover:bg-white/10 bg-transparent"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div className="relative h-64 overflow-hidden rounded-lg border border-white/10">
        {isLoading ? (
          <div className="flex h-full items-center justify-center bg-white/5">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : userLocation ? (
          <iframe
            title="Event Locations Map"
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
    </div>
  );
}