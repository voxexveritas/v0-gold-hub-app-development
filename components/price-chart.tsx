"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Metal = "gold" | "silver";
type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y";

interface PriceData {
  time: string;
  price: number;
}

// Simulated real-time data based on Jan 2026 prices - in production, connect to GoldAPI.io or MetalpriceAPI
const generatePriceData = (
  metal: Metal,
  range: TimeRange
): { data: PriceData[]; currentPrice: number; change: number } => {
  // Current prices as of Jan 2026: Gold ~$5,100/oz, Silver ~$110/oz
  const basePrice = metal === "gold" ? 5089 : 109.5;
  const volatility = metal === "gold" ? 45 : 1.8;

  const points =
    range === "1D"
      ? 24
      : range === "1W"
        ? 7
        : range === "1M"
          ? 30
          : range === "3M"
            ? 90
            : 365;

  const data: PriceData[] = [];
  let price = basePrice - volatility * 2;

  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.48) * volatility * 0.5;
    price = Math.max(price, basePrice * 0.95);
    price = Math.min(price, basePrice * 1.05);

    const label =
      range === "1D"
        ? `${i}:00`
        : range === "1W"
          ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
          : range === "1M"
            ? `Day ${i + 1}`
            : range === "3M"
              ? `Week ${Math.floor(i / 7) + 1}`
              : `Month ${Math.floor(i / 30) + 1}`;

    data.push({
      time: label,
      price: Number(price.toFixed(2)),
    });
  }

  const currentPrice = data[data.length - 1].price;
  const startPrice = data[0].price;
  const change = ((currentPrice - startPrice) / startPrice) * 100;

  return { data, currentPrice, change };
};

export function PriceChart() {
  const [metal, setMetal] = useState<Metal>("gold");
  const [timeRange, setTimeRange] = useState<TimeRange>("1D");
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchPriceData();
    // Auto-refresh every 30 seconds for live updates
    const interval = setInterval(fetchPriceData, 30000);
    return () => clearInterval(interval);
  }, [metal, timeRange, mounted]);

  const fetchPriceData = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const { data, currentPrice, change } = generatePriceData(metal, timeRange);
      setPriceData(data);
      setCurrentPrice(currentPrice);
      setPriceChange(change);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 300);
  };

  const formatPrice = (price: number) => {
    return metal === "gold"
      ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `$${price.toFixed(2)}`;
  };

  const isPositive = priceChange >= 0;

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-bold text-foreground">
              Spot Price
            </CardTitle>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary"
            >
              LIVE
            </Badge>
          </div>

          {/* Metal Toggle */}
          <div className="flex gap-2">
            <Button
              variant={metal === "gold" ? "default" : "outline"}
              size="sm"
              onClick={() => setMetal("gold")}
              className={
                metal === "gold"
                  ? "bg-gold text-primary-foreground hover:bg-gold-light"
                  : "border-gold/30 text-gold hover:bg-gold/10"
              }
            >
              Gold
            </Button>
            <Button
              variant={metal === "silver" ? "default" : "outline"}
              size="sm"
              onClick={() => setMetal("silver")}
              className={
                metal === "silver"
                  ? "bg-silver text-primary-foreground hover:bg-silver-light"
                  : "border-silver/30 text-silver hover:bg-silver/10"
              }
            >
              Silver
            </Button>
          </div>
        </div>

        {/* Price Display */}
        <div className="mt-4 flex items-end gap-4">
          <span
            className={`text-4xl font-bold ${metal === "gold" ? "text-gold" : "text-silver"}`}
          >
            {formatPrice(currentPrice)}
          </span>
          <div className="flex items-center gap-1 pb-1">
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-success" />
            ) : (
              <TrendingDown className="h-5 w-5 text-destructive" />
            )}
            <span
              className={`text-lg font-semibold ${isPositive ? "text-success" : "text-destructive"}`}
            >
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}%
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchPriceData}
            disabled={isLoading}
            className="ml-auto h-8 w-8"
          >
            <RefreshCw
              className={`h-4 w-4 text-muted-foreground ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Per troy ounce | Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </CardHeader>

      <CardContent>
        {/* Time Range Selector */}
        <div className="mb-4 flex gap-1">
          {(["1D", "1W", "1M", "3M", "1Y"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={`flex-1 text-xs ${
                timeRange === range
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 w-full">
          {mounted && priceData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b8b8b8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#b8b8b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={["dataMin - 5", "dataMax + 5"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 10 }}
                  tickFormatter={(value) =>
                    metal === "gold" ? `$${value}` : `$${value.toFixed(1)}`
                  }
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                  formatter={(value: number) => [formatPrice(value), "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={metal === "gold" ? "#d4af37" : "#b8b8b8"}
                  strokeWidth={2}
                  fill={
                    metal === "gold"
                      ? "url(#goldGradient)"
                      : "url(#silverGradient)"
                  }
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">24h High</p>
            <p
              className={`font-semibold ${metal === "gold" ? "text-gold" : "text-silver"}`}
            >
              {formatPrice(currentPrice * 1.012)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">24h Low</p>
            <p
              className={`font-semibold ${metal === "gold" ? "text-gold" : "text-silver"}`}
            >
              {formatPrice(currentPrice * 0.988)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-semibold text-foreground">$2.4B</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
