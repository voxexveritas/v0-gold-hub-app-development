import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function MarketplaceSignupCTA() {
  return (
    <Link href="/marketplace/signup">
      <Card className="glass-card p-6 text-center rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
        <CardContent className="p-0">
          <h2 className="text-xl font-bold mb-3 text-foreground">Join the Local Marketplace!</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Sign up to get added to the listings map and connect with local buyers and sellers.
          </p>
          <span className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-colors">
            Sign Up Today
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
