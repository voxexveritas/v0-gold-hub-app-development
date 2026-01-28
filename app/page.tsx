"use client";

import { useState, useRef, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { PriceChart } from "@/components/price-chart";
import { DealerMap } from "@/components/dealer-map";
import { BullionCompare } from "@/components/bullion-compare";
import { MarketplaceSection } from "@/components/marketplace/marketplace-section";

type Tab = "prices" | "dealers" | "compare" | "marketplace";

export default function AuXioApp() {
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
              Track Precious Metals in{" "}
              <span className="text-primary">Real-Time</span>
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground text-pretty">
              Live gold and silver spot prices, find local dealers, and compare
              premiums across major bullion dealers to get the best value.
            </p>
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

        {/* Market Stats Footer */}
        <section className="glass-card mt-8 rounded-xl p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Market Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MarketStat
              label="Gold/Silver Ratio"
              value="46.3"
              change="+0.8%"
              isPositive
            />
            <MarketStat
              label="USD Index"
              value="107.24"
              change="-0.22%"
              isPositive={false}
            />
            <MarketStat
              label="Gold Futures"
              value="$5,112.40"
              change="+1.1%"
              isPositive
            />
            <MarketStat
              label="Silver Futures"
              value="$110.45"
              change="+1.8%"
              isPositive
            />
          </div>
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

function MarketStat({
  label,
  value,
  change,
  isPositive,
}: {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
      <p
        className={`text-xs ${isPositive ? "text-success" : "text-destructive"}`}
      >
        {change}
      </p>
    </div>
  );
}
