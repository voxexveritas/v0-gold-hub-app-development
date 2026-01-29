"use client";

import { MarketplaceSignupCTA } from "./marketplace-signup-cta";
import { UserListing } from "./user-listing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import Link from "next/link";

const mockListings = [
  {
    name: "Bob Smith",
    location: "Anchorage, AK",
    bio: "Bob has been with the Anchorage Coin Club for 25 years specializing in rare Alaskan gold nuggets and silver dollars.",
    tradeOffers: "Local Coin / Buy / Sell / Trade",
    imageUrl: "/placeholder-user.jpg",
  },
  {
    name: "Alice Johnson",
    location: "Seattle, WA",
    bio: "Alice is a private collector with a passion for antique gold jewelry and pre-1933 US gold coins.",
    tradeOffers: "Antique Gold Jewelry / US Gold Coins / Buy / Sell",
    imageUrl: "/placeholder-user.jpg",
  },
  {
    name: "Charlie Brown",
    location: "Denver, CO",
    bio: "Charlie focuses on modern bullion products, especially silver rounds and bars. Always looking for good deals!",
    tradeOffers: "Silver Bullion / Buy / Sell",
    imageUrl: "/placeholder-user.jpg",
  },
  {
    name: "Diana Miller",
    location: "Miami, FL",
    bio: "Diana trades in certified precious metal coins and has a keen eye for error coins. Member of the Florida Numismatic Association.",
    tradeOffers: "Certified Coins / Buy / Trade",
    imageUrl: "/placeholder-user.jpg",
  },
  {
    name: "Eve Davis",
    location: "Austin, TX",
    bio: "Eve is a enthusiast of world coins and ancient artifacts. Offers evaluations and trades for unique pieces.",
    tradeOffers: "World Coins / Ancient Artifacts / Sell / Trade",
    imageUrl: "/placeholder-user.jpg",
  },
];

export function MarketplaceSection() {
  return (
    <Card className="glass-card border-0 rounded-xl flex flex-col" style={{ height: "calc(572px + 64px)" }}>
      {/* Fixed Header */}
      <CardHeader className="pb-4 flex-shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-foreground">Local Marketplace</CardTitle>
            <p className="text-sm text-muted-foreground">Connect with private collectors nearby</p>
          </div>
        </div>
      </CardHeader>
      
      {/* Fixed CTA Section */}
      <div className="flex-shrink-0 p-4 border-b border-white/10">
        <Link href="/marketplace/signup">
          <div className="glass-card p-5 rounded-xl text-center hover:bg-white/10 transition-colors cursor-pointer">
            <h3 className="text-lg font-bold mb-2 text-foreground">Join the Local Marketplace!</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Sign up to get added to the listings map and connect with local buyers and sellers.
            </p>
            <span className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-colors">
              Sign Up Today
            </span>
          </div>
        </Link>
      </div>
      
      {/* Scrollable Content */}
      <CardContent className="flex-1 overflow-y-auto p-4 glass-scroll">
        <h3 className="text-lg font-semibold text-foreground mb-4">Community Listings</h3>
        <div className="space-y-3">
          {mockListings.map((listing, index) => (
            <UserListing key={index} {...listing} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
