import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function MarketplaceSignupCTA() {
  return (
    <Card className="glass-card p-6 text-center">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Join the Local Marketplace!</h2>
        <p className="text-muted-foreground mb-4">
          Sign up today to get added to the listings map and connect with local buyers and sellers.
          ID authentication is required for private dealers for safety purposes.
        </p>
        <Button disabled className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-2 px-4 rounded">
          Sign Up Today
        </Button>
      </CardContent>
    </Card>
  );
}