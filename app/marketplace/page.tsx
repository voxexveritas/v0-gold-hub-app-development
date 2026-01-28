import { SignupForm } from "../../components/marketplace/signup-form";
import { DealerMap } from "../../components/dealer-map";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
      <p className="text-lg mb-8">Buy and sell gold locally!</p>
      <SignupForm />
      <div className="mt-8">
        <DealerMap />
      </div>
    </div>
  );
}