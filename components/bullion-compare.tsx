"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  TrendingDown,
  ExternalLink,
  Award,
  ShoppingCart,
} from "lucide-react";

type ProductType = "coins" | "bars";
type Metal = "gold" | "silver";
type CoinType =
  | "american_eagle"
  | "canadian_maple"
  | "krugerrand"
  | "american_buffalo"
  | "austrian_philharmonic";
type BarSize = "1oz" | "10oz" | "1kg" | "100g";

interface DealerPrice {
  dealer: string;
  price: number;
  premium: number;
  premiumPercent: number;
  shipping: number;
  inStock: boolean;
  url: string;
}

// Simulated dealer pricing data - in production, scrape or use dealer APIs
const generateDealerPrices = (
  spotPrice: number,
  productType: ProductType,
  size: BarSize | CoinType
): DealerPrice[] => {
  const dealers = [
    { name: "APMEX", basePercent: 5.2 },
    { name: "JM Bullion", basePercent: 4.8 },
    { name: "SD Bullion", basePercent: 4.3 },
    { name: "Money Metals", basePercent: 5.0 },
    { name: "Provident Metals", basePercent: 4.6 },
    { name: "BGASC", basePercent: 4.1 },
    { name: "Silver Gold Bull", basePercent: 4.9 },
    { name: "Goldline", basePercent: 6.2 },
  ];

  // Adjust premium based on product type and size
  const sizeMultiplier =
    productType === "bars"
      ? size === "1oz"
        ? 1.2
        : size === "10oz"
          ? 0.8
          : size === "100g"
            ? 0.9
            : 0.7
      : size === "american_eagle"
        ? 1.1
        : size === "canadian_maple"
          ? 1.0
          : size === "krugerrand"
            ? 0.95
            : size === "american_buffalo"
              ? 1.15
              : 1.0;

  return dealers
    .map((dealer) => {
      const variance = (Math.random() - 0.5) * 2;
      const premiumPercent =
        (dealer.basePercent + variance) * sizeMultiplier;
      const premium = spotPrice * (premiumPercent / 100);
      const price = spotPrice + premium;
      const shipping = Math.random() > 0.6 ? 0 : 9.95 + Math.random() * 10;

      return {
        dealer: dealer.name,
        price: Number(price.toFixed(2)),
        premium: Number(premium.toFixed(2)),
        premiumPercent: Number(premiumPercent.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        inStock: Math.random() > 0.15,
        url: `https://${dealer.name.toLowerCase().replace(/\s/g, "")}.com`,
      };
    })
    .sort((a, b) => a.price + a.shipping - (b.price + b.shipping));
};

const coinNames: Record<CoinType, string> = {
  american_eagle: "American Gold Eagle",
  canadian_maple: "Canadian Maple Leaf",
  krugerrand: "South African Krugerrand",
  american_buffalo: "American Buffalo",
  austrian_philharmonic: "Austrian Philharmonic",
};

const barSizes: Record<BarSize, string> = {
  "1oz": "1 oz Bar",
  "10oz": "10 oz Bar",
  "100g": "100 gram Bar",
  "1kg": "1 kg Bar",
};

export function BullionCompare() {
  const [metal, setMetal] = useState<Metal>("gold");
  const [productType, setProductType] = useState<ProductType>("coins");
  const [selectedCoin, setSelectedCoin] = useState<CoinType>("american_eagle");
  const [selectedBar, setSelectedBar] = useState<BarSize>("1oz");
  const [sortBy, setSortBy] = useState<"price" | "premium" | "total">("total");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using random values
  useEffect(() => {
    setMounted(true);
  }, []);

  // Current spot prices as of Jan 2026
  const spotPrices = {
    gold: 5089.0,
    silver: 109.5,
  };

  const spotPrice = spotPrices[metal];
  const selection = productType === "coins" ? selectedCoin : selectedBar;

  // Weight multiplier for bars
  const getWeight = (size: BarSize): number => {
    switch (size) {
      case "1oz":
        return 1;
      case "10oz":
        return 10;
      case "100g":
        return 3.215; // 100g ≈ 3.215 troy oz
      case "1kg":
        return 32.15; // 1kg ≈ 32.15 troy oz
      default:
        return 1;
    }
  };

  const adjustedSpot =
    productType === "bars"
      ? spotPrice * getWeight(selectedBar)
      : spotPrice;

  // Only generate prices after mount to avoid hydration mismatch
  const dealerPrices = useMemo(
    () => mounted ? generateDealerPrices(adjustedSpot, productType, selection) : [],
    [adjustedSpot, productType, selection, mounted]
  );

  const sortedPrices = useMemo(() => {
    return [...dealerPrices].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "premium":
          return a.premiumPercent - b.premiumPercent;
        case "total":
        default:
          return a.price + a.shipping - (b.price + b.shipping);
      }
    });
  }, [dealerPrices, sortBy]);

  const lowestPrice = sortedPrices[0];
  const highestPrice = sortedPrices[sortedPrices.length - 1];
  const savings = lowestPrice && highestPrice
    ? highestPrice.price + highestPrice.shipping - (lowestPrice.price + lowestPrice.shipping)
    : 0;

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <ArrowUpDown className="h-5 w-5 text-primary" />
          Bullion Price Comparison
        </CardTitle>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Metal Toggle */}
          <Select value={metal} onValueChange={(v) => setMetal(v as Metal)}>
            <SelectTrigger>
              <SelectValue placeholder="Metal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
            </SelectContent>
          </Select>

          {/* Product Type */}
          <Select
            value={productType}
            onValueChange={(v) => setProductType(v as ProductType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coins">Coins</SelectItem>
              <SelectItem value="bars">Bars</SelectItem>
            </SelectContent>
          </Select>

          {/* Coin/Bar Selection */}
          {productType === "coins" ? (
            <Select
              value={selectedCoin}
              onValueChange={(v) => setSelectedCoin(v as CoinType)}
            >
              <SelectTrigger className="col-span-2 sm:col-span-1">
                <SelectValue placeholder="Coin" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(coinNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Select
              value={selectedBar}
              onValueChange={(v) => setSelectedBar(v as BarSize)}
            >
              <SelectTrigger className="col-span-2 sm:col-span-1">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(barSizes).map(([key, name]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Sort By */}
          <Select
            value={sortBy}
            onValueChange={(v) =>
              setSortBy(v as "price" | "premium" | "total")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="total">Total Cost</SelectItem>
              <SelectItem value="price">Base Price</SelectItem>
              <SelectItem value="premium">Premium %</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Spot Price & Savings Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-3">
          <div>
            <p className="text-xs text-muted-foreground">Current Spot Price</p>
            <p
              className={`text-lg font-bold ${metal === "gold" ? "text-gold" : "text-silver"}`}
            >
              ${adjustedSpot.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {productType === "bars" && selectedBar !== "1oz"
                  ? `(${barSizes[selectedBar]})`
                  : "/oz"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Potential Savings</p>
              <p className="font-bold text-success">
                ${mounted ? savings.toFixed(2) : "--"}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Product Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10">
            <Award className={`h-6 w-6 ${metal === "gold" ? "text-gold" : "text-silver"}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {productType === "coins"
                ? coinNames[selectedCoin]
                : `${metal === "gold" ? "Gold" : "Silver"} ${barSizes[selectedBar]}`}
            </h3>
            <p className="text-sm text-muted-foreground">
              Comparing {sortedPrices.length} dealers
            </p>
          </div>
        </div>

        {/* Dealer Comparison Table */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2 glass-scroll">
          {sortedPrices.map((dealer, index) => (
            <div
              key={dealer.dealer}
              className={`relative overflow-hidden rounded-lg border p-3 transition-all backdrop-blur-sm ${
                index === 0
                  ? "border-success/50 bg-success/10"
                  : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"
              }`}
            >
              {index === 0 && (
                <Badge className="absolute right-2 top-2 bg-success text-success-foreground">
                  Best Price
                </Badge>
              )}

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">
                      {dealer.dealer}
                    </h4>
                    {!dealer.inStock && (
                      <Badge variant="outline" className="text-xs text-destructive border-destructive/30">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      Premium:{" "}
                      <span className="text-foreground">
                        ${dealer.premium.toFixed(2)} ({dealer.premiumPercent}%)
                      </span>
                    </span>
                    <span>
                      Shipping:{" "}
                      <span
                        className={
                          dealer.shipping === 0 ? "text-success" : "text-foreground"
                        }
                      >
                        {dealer.shipping === 0
                          ? "FREE"
                          : `$${dealer.shipping.toFixed(2)}`}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${metal === "gold" ? "text-gold" : "text-silver"}`}
                    >
                      ${dealer.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total: $
                      {(dealer.price + dealer.shipping).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-1 bg-transparent"
                    disabled={!dealer.inStock}
                    onClick={() => window.open(dealer.url, "_blank")}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Buy</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-muted-foreground">
          Prices are for reference only and may not reflect real-time dealer
          pricing. Always verify prices directly with dealers before purchasing.
        </p>
      </CardContent>
    </Card>
  );
}
