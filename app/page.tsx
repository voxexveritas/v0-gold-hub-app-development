"use client";

import { useState, useRef, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { PriceChart } from "@/components/price-chart";
import { DealerMap } from "@/components/dealer-map";
import { BullionCompare } from "@/components/bullion-compare";
import { MarketplaceSection } from "@/components/marketplace/marketplace-section";
import { Calendar, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Tab = "prices" | "dealers" | "compare" | "marketplace";

// Events data for the carousel
const events = [
  {
    id: "1",
    name: "New York International Numismatic Convention",
    date: "January 11-14, 2026",
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
  },
  {
    id: "2",
    name: "FUN Convention (Florida United Numismatists)",
    date: "January 18-21, 2026",
    location: "Orlando, FL",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
  },
  {
    id: "3",
    name: "Long Beach Coin, Currency & Collectible Show",
    date: "February 22-24, 2026",
    location: "Long Beach, CA",
    imageUrl: "https://images.unsplash.com/photo-1621419203051-df0e7bf5c5c6?w=800&q=80",
  },
  {
    id: "4",
    name: "ANA National Money Show",
    date: "March 7-9, 2026",
    location: "Colorado Springs, CO",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  },
  {
    id: "5",
    name: "Central States Numismatic Society Convention",
    date: "April 24-27, 2026",
    location: "Schaumburg, IL",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
];

function EventsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Upcoming Events</h2>
        </div>
        <Link 
          href="/events" 
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {events.map((event) => (
              <div key={event.id} className="flex-shrink-0 w-full">
                <div className="relative h-48">
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-center gap-2 text-primary text-xs mb-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 p-3 border-t border-white/10">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex 
                ? "w-6 bg-primary" 
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function GoldMapApp() {
  const [activeTab, setActiveTab] = useState<Tab>("prices");
  const priceChartRef = useRef<HTMLDivElement>(null);
  const dealerMapRef = useRef<HTMLDivElement>(null);
  const bullionCompareRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (tab: Tab) => {
    setActiveTab(tab);
    let ref = null;
    if (tab === "prices") ref = priceChartRef;
    else if (tab === "dealers") ref = dealerMapRef;
    else if (tab === "compare") ref = bullionCompareRef;
    else if (tab === "marketplace") ref = marketplaceRef;

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToSection("prices");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-silver/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-silver/10 blur-3xl" />
      </div>

      <MobileNav activeTab={activeTab} onTabChange={scrollToSection} />

      <main className="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">
        {/* Hero Section - Desktop Only */}
        <section className="mb-8 hidden md:block">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-foreground text-balance">
              Your Complete <span className="text-primary">Precious Metals</span> Command Center
            </h1>
            <p className="mt-3 max-w-3xl text-muted-foreground text-pretty leading-relaxed">
              Track live gold and silver spot prices with real-time charts. Discover trusted local dealers on our interactive map. 
              Compare premiums across major bullion retailers to find the best deals. Connect with private collectors in our 
              peer-to-peer marketplace. Explore upcoming coin shows and conventions. Master investing with our curated learning center.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Live Spot Prices</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Dealer Locator</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Premium Comparison</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">P2P Marketplace</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Event Calendar</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Learning Center</span>
            </div>
          </div>
        </section>

        {/* Mobile: Single Tab View */}
        <div className="md:hidden">
          {activeTab === "prices" && <PriceChart />}
          {activeTab === "dealers" && <DealerMap />}
          {activeTab === "compare" && <BullionCompare />}
          {activeTab === "marketplace" && <MarketplaceSection />}
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          <div className="space-y-6">
            <div id="prices" ref={priceChartRef}>
              <PriceChart />
            </div>
            <div id="dealers" ref={dealerMapRef}>
              <DealerMap />
            </div>
          </div>
          <div className="space-y-6">
            <div id="compare" ref={bullionCompareRef}>
              <BullionCompare />
            </div>
            <div id="marketplace" ref={marketplaceRef}>
              <MarketplaceSection />
            </div>
          </div>
        </div>

        {/* Events Carousel - Desktop */}
        <section className="hidden md:block mt-6">
          <EventsCarousel />
        </section>

        {/* Info Footer */}
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            Data provided for informational purposes only. Prices may vary by
            dealer.
          </p>
          <p className="mt-1">
            Connect a{" "}
            <a
              href="https://goldapi.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GoldAPI.io
            </a>
            {" "}or{" "}
            <a
              href="https://metalpriceapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MetalpriceAPI
            </a>
            {" "}key for live data.
          </p>
        </footer>
      </main>
    </div>
  );
}
