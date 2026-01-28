import { MarketplaceSignupCTA } from "./marketplace-signup-cta";
import { UserListing } from "./user-listing";
// Removed: import { DealerMap } from "../dealer-map";

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
    <div className="glass-card p-6">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Local Marketplace</h1>
      <p className="text-lg mb-8 text-muted-foreground">Connect with private individuals for local gold, coin, and jewelry trades.</p>

      <div className="mb-8">
        <MarketplaceSignupCTA />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Community Listings</h2>
        <div className="space-y-4"> {/* Changed from grid to vertical spacing */} 
          {mockListings.map((listing, index) => (
            <UserListing key={index} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
}