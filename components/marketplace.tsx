"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Star,
  Shield,
  Plus,
  User,
  Mail,
  Lock,
  MessageCircle,
  Filter,
  ChevronDown,
} from "lucide-react";

type ListingType = "sell" | "buy" | "trade";
type MetalType = "gold" | "silver" | "platinum" | "coins";

interface Listing {
  id: string;
  title: string;
  type: ListingType;
  metalType: MetalType;
  price: number;
  weight: string;
  purity: string;
  description: string;
  seller: {
    name: string;
    rating: number;
    trades: number;
    verified: boolean;
    location: string;
  };
  images: string[];
  createdAt: string;
  featured: boolean;
}

// Mock listings data
const mockListings: Listing[] = [
  {
    id: "1",
    title: "1oz American Gold Eagle 2025",
    type: "sell",
    metalType: "gold",
    price: 5340,
    weight: "1 oz",
    purity: ".9167",
    description: "Brand new, in original mint capsule. Local pickup preferred in Miami area.",
    seller: {
      name: "GoldTrader_Mike",
      rating: 4.9,
      trades: 127,
      verified: true,
      location: "Miami, FL",
    },
    images: [],
    createdAt: "2 hours ago",
    featured: true,
  },
  {
    id: "2",
    title: "10x 1oz Silver Canadian Maple Leafs",
    type: "sell",
    metalType: "silver",
    price: 1180,
    weight: "10 oz total",
    purity: ".9999",
    description: "Selling a tube of 10 Silver Maples. All BU condition. Will ship insured.",
    seller: {
      name: "SilverStacker92",
      rating: 4.7,
      trades: 84,
      verified: true,
      location: "Austin, TX",
    },
    images: [],
    createdAt: "5 hours ago",
    featured: false,
  },
  {
    id: "3",
    title: "LOOKING TO BUY: Pre-1933 Gold Coins",
    type: "buy",
    metalType: "coins",
    price: 0,
    weight: "Any",
    purity: "Various",
    description: "Collector seeking $20 Saint-Gaudens and Liberty Double Eagles. Will pay above spot for good condition.",
    seller: {
      name: "NumismaticNick",
      rating: 5.0,
      trades: 203,
      verified: true,
      location: "Chicago, IL",
    },
    images: [],
    createdAt: "1 day ago",
    featured: true,
  },
  {
    id: "4",
    title: "5oz Silver Bar - PAMP Suisse",
    type: "sell",
    metalType: "silver",
    price: 595,
    weight: "5 oz",
    purity: ".999",
    description: "PAMP Suisse Lady Fortuna 5oz bar with assay card. Pristine condition.",
    seller: {
      name: "BullionBoss",
      rating: 4.8,
      trades: 56,
      verified: true,
      location: "Denver, CO",
    },
    images: [],
    createdAt: "3 hours ago",
    featured: false,
  },
  {
    id: "5",
    title: "TRADE: Gold for Silver at 45:1",
    type: "trade",
    metalType: "gold",
    price: 0,
    weight: "1 oz",
    purity: ".999",
    description: "Looking to trade my 1oz gold bar for silver at 45:1 ratio. Open to various silver products.",
    seller: {
      name: "MetalSwapper",
      rating: 4.6,
      trades: 31,
      verified: false,
      location: "Seattle, WA",
    },
    images: [],
    createdAt: "6 hours ago",
    featured: false,
  },
  {
    id: "6",
    title: "1/4oz Gold Krugerrand",
    type: "sell",
    metalType: "gold",
    price: 1385,
    weight: "1/4 oz",
    purity: ".9167",
    description: "South African Krugerrand, random year. Great for fractional gold stacking.",
    seller: {
      name: "PreciousMetalsPro",
      rating: 4.9,
      trades: 168,
      verified: true,
      location: "Phoenix, AZ",
    },
    images: [],
    createdAt: "12 hours ago",
    featured: false,
  },
];

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<ListingType | "all">("all");
  const [filterMetal, setFilterMetal] = useState<MetalType | "all">("all");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || listing.type === filterType;
    const matchesMetal = filterMetal === "all" || listing.metalType === filterMetal;
    return matchesSearch && matchesType && matchesMetal;
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    setUserName(name);
    setIsLoggedIn(true);
    setIsSignUpOpen(false);
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    setUserName(email.split("@")[0]);
    setIsLoggedIn(true);
    setIsSignInOpen(false);
  };

  const getTypeColor = (type: ListingType) => {
    switch (type) {
      case "sell":
        return "bg-success/20 text-success border-success/30";
      case "buy":
        return "bg-primary/20 text-primary border-primary/30";
      case "trade":
        return "bg-accent/20 text-accent border-accent/30";
    }
  };

  const getMetalIcon = (metal: MetalType) => {
    switch (metal) {
      case "gold":
        return "bg-gold/20 text-gold";
      case "silver":
        return "bg-silver/20 text-silver";
      case "platinum":
        return "bg-white/20 text-white";
      case "coins":
        return "bg-primary/20 text-primary";
    }
  };

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <span className="text-sm font-bold text-primary">P2P</span>
              </div>
              Marketplace
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Buy, sell, and trade precious metals locally
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Badge className="bg-success/20 text-success border-success/30">
                  <User className="mr-1 h-3 w-3" />
                  {userName}
                </Badge>
                <Dialog open={isCreateListingOpen} onOpenChange={setIsCreateListingOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="mr-1 h-4 w-4" />
                      List Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Create Listing</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        List your precious metals for sale or trade
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="listing-title" className="text-foreground">Title</Label>
                        <Input
                          id="listing-title"
                          placeholder="e.g., 1oz American Gold Eagle"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Listing Type</Label>
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                              <SelectItem value="sell">Selling</SelectItem>
                              <SelectItem value="buy">Buying</SelectItem>
                              <SelectItem value="trade">Trading</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Metal Type</Label>
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Select metal" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="silver">Silver</SelectItem>
                              <SelectItem value="platinum">Platinum</SelectItem>
                              <SelectItem value="coins">Coins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price" className="text-foreground">Price ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="0.00"
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight" className="text-foreground">Weight</Label>
                          <Input
                            id="weight"
                            placeholder="e.g., 1 oz"
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-foreground">Description</Label>
                        <textarea
                          id="description"
                          rows={3}
                          placeholder="Describe your item..."
                          className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 p-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm text-foreground">
                          Your listing will appear on the AuXio map
                        </span>
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Create Listing
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Welcome Back</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Sign in to your AuXio marketplace account
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="text-foreground">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password" className="text-foreground">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="signin-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Sign In
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <User className="mr-1 h-4 w-4" />
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Join AuXio</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Create an account to buy, sell, and trade precious metals
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-foreground">Display Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            name="name"
                            type="text"
                            placeholder="GoldTrader123"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-location" className="text-foreground">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="signup-location"
                            name="location"
                            type="text"
                            placeholder="City, State"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 p-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="text-sm text-foreground">
                          Your location helps buyers find local sellers
                        </span>
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Create Account
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/10 pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={(v) => setFilterType(v as ListingType | "all")}>
              <SelectTrigger className="w-32 bg-white/5 border-white/10">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sell">Selling</SelectItem>
                <SelectItem value="buy">Buying</SelectItem>
                <SelectItem value="trade">Trading</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMetal} onValueChange={(v) => setFilterMetal(v as MetalType | "all")}>
              <SelectTrigger className="w-32 bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="all">All Metals</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="coins">Coins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Become a Verified Seller</h3>
              <p className="text-sm text-muted-foreground">
                Get a verified badge and appear on the AuXio dealer map
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>

        {/* Listings */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 glass-scroll">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className={`rounded-lg border p-4 transition-all backdrop-blur-sm ${
                listing.featured
                  ? "border-primary/30 bg-primary/5"
                  : "border-white/10 bg-white/5 hover:border-primary/20 hover:bg-white/10"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {listing.featured && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                        Featured
                      </Badge>
                    )}
                    <Badge className={`${getTypeColor(listing.type)} text-xs`}>
                      {listing.type.toUpperCase()}
                    </Badge>
                    <Badge className={`${getMetalIcon(listing.metalType)} text-xs border`}>
                      {listing.metalType.charAt(0).toUpperCase() + listing.metalType.slice(1)}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">{listing.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>Weight: {listing.weight}</span>
                    <span>Purity: {listing.purity}</span>
                    <span>{listing.createdAt}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {listing.price > 0 && (
                    <span className="text-xl font-bold text-primary">
                      ${listing.price.toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      {listing.seller.verified && (
                        <Shield className="h-4 w-4 text-success" />
                      )}
                      <span className="text-foreground">{listing.seller.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{listing.seller.rating}</span>
                    </div>
                    <span>({listing.seller.trades} trades)</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{listing.seller.location}</span>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2 border-white/10 hover:bg-white/10 bg-transparent">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No listings found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
