"use client";

import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  CheckCircle2,
  Sparkles,
  Shield,
  Users,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";

interface Dealer {
  id: string;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  coins: { name: string; price: string; imageUrl: string }[];
}

const mockDealers: Dealer[] = [
  {
    id: "1",
    name: "Bob Smith",
    location: "Anchorage, AK",
    specialty: "Rare Alaskan Gold",
    rating: 4.9,
    imageUrl: "/placeholder-user.jpg",
    coins: [
      { name: "1oz Gold Eagle", price: "$2,150", imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&q=80" },
      { name: "Morgan Silver Dollar", price: "$45", imageUrl: "https://images.unsplash.com/photo-1621419203051-df0e7bf5c5c6?w=200&q=80" },
    ]
  },
  {
    id: "2",
    name: "Alice Johnson",
    location: "Seattle, WA",
    specialty: "Pre-1933 US Gold",
    rating: 4.8,
    imageUrl: "/placeholder-user.jpg",
    coins: [
      { name: "$20 Liberty Gold", price: "$2,400", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80" },
      { name: "Peace Dollar", price: "$32", imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&q=80" },
    ]
  },
  {
    id: "3",
    name: "Charlie Brown",
    location: "Denver, CO",
    specialty: "Silver Bullion",
    rating: 4.7,
    imageUrl: "/placeholder-user.jpg",
    coins: [
      { name: "10oz Silver Bar", price: "$285", imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&q=80" },
      { name: "Silver Round", price: "$28", imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&q=80" },
    ]
  },
  {
    id: "4",
    name: "Diana Miller",
    location: "Miami, FL",
    specialty: "Certified Coins",
    rating: 5.0,
    imageUrl: "/placeholder-user.jpg",
    coins: [
      { name: "MS65 Walking Liberty", price: "$125", imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=200&q=80" },
      { name: "PR70 Silver Eagle", price: "$85", imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&q=80" },
    ]
  },
];

const allCoins = mockDealers.flatMap(dealer => 
  dealer.coins.map(coin => ({ ...coin, dealer: dealer.name, dealerLocation: dealer.location }))
);

export default function MarketplaceSignupPage() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    experience: "",
    specialties: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignedUp(true);
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % allCoins.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + allCoins.length) % allCoins.length);
  };

  if (isSignedUp) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated gradient background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-success/10 via-transparent to-transparent" />
        </div>

        <MobileNav />

        <main className="mx-auto max-w-7xl px-4 py-8 pb-24 md:pb-8">
          {/* Success Banner */}
          <section className="mb-8">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-success/20 to-transparent rounded-full blur-3xl" />
              <div className="relative flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Welcome to the <span className="text-primary">Marketplace!</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Your profile is now live. Start connecting with local collectors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="mb-8">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Private Dealers Near You</h2>
                  <p className="text-sm text-muted-foreground">Connect with collectors in your area</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d10000000!2d-98.5795!3d39.8283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sprivate%20coin%20collectors!5e0!3m2!1sen!2sus!4v1706400000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </section>

          {/* Dealers List */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Local Private Dealers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDealers.map((dealer) => (
                <Card key={dealer.id} className="glass-card border-0 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-foreground">{dealer.name}</h3>
                          <div className="flex items-center gap-1 text-primary">
                            <Star className="h-4 w-4 fill-primary" />
                            <span className="text-sm font-medium">{dealer.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {dealer.location}
                        </p>
                        <p className="text-sm text-primary mt-1">{dealer.specialty}</p>
                        <Button size="sm" className="mt-3 rounded-full">
                          Contact Dealer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Listings Carousel */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Featured Listings</h2>
                <p className="text-sm text-muted-foreground">Coins from local dealers</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative overflow-hidden">
              <div 
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * 220}px)` }}
              >
                {allCoins.map((coin, index) => (
                  <Card key={index} className="glass-card border-0 rounded-xl overflow-hidden flex-shrink-0 w-[200px] hover:bg-white/10 transition-colors">
                    <div className="h-32 relative">
                      <img 
                        src={coin.imageUrl} 
                        alt={coin.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground text-sm">{coin.name}</h3>
                      <p className="text-primary font-bold text-lg">{coin.price}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {coin.dealer} - {coin.dealerLocation}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {allCoins.slice(0, Math.min(6, allCoins.length)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === carouselIndex % 6
                      ? "w-6 bg-primary" 
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-silver/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      </div>

      <MobileNav />

      <main className="mx-auto max-w-4xl px-4 py-8 pb-24 md:pb-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-silver/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 text-primary mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Free Registration</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                Join the <span className="text-primary">GoldMap</span> Marketplace
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Become a verified private dealer and connect with collectors in your area. 
                Get discovered on the map and start trading today.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">ID Verified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">500+ Active Dealers</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Nationwide Coverage</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section>
          <form onSubmit={handleSubmit}>
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Create Your Profile</h2>
              
              {/* Personal Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="glass-input mt-1"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="glass-input mt-1"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="glass-input mt-1"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="glass-input mt-1"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location (Optional - for map listing)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-foreground">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        className="glass-input mt-1"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2 md:col-span-2">
                        <Label htmlFor="city" className="text-foreground">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          className="glass-input mt-1"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-foreground">State</Label>
                        <Input
                          id="state"
                          placeholder="NY"
                          className="glass-input mt-1"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="text-foreground">ZIP</Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          className="glass-input mt-1"
                          value={formData.zip}
                          onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Experience & Specialties
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="experience" className="text-foreground">Years of Experience</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 5 years"
                        className="glass-input mt-1"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialties" className="text-foreground">Specialties</Label>
                      <Input
                        id="specialties"
                        placeholder="e.g., Gold coins, Silver bullion, Ancient coins"
                        className="glass-input mt-1"
                        value={formData.specialties}
                        onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Button type="submit" size="lg" className="w-full rounded-xl text-lg py-6">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Complete Registration
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                  ID verification may be required for safety purposes.
                </p>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
