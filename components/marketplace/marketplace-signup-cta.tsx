import { Button } from "@/components/ui/button";

export function MarketplaceSignupCTA() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Join the Local Marketplace!</h2>
      <p className="text-gray-700 mb-4">
        Sign up today to get added to the listings map and connect with local buyers and sellers.
        ID authentication is required for private dealers for safety purposes.
      </p>
      <Button disabled className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Up Today
      </Button>
    </div>
  );
}