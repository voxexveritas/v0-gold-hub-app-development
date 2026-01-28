"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  MapPin,
  ArrowUpDown,
  Menu,
  X,
  Coins, Store, BookOpen, Calendar
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = "prices" | "dealers" | "compare";

interface MobileNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const inPageTabs = [
    { id: "prices" as const, label: "Prices", icon: TrendingUp },
    { id: "dealers" as const, label: "Dealers", icon: MapPin },
    { id: "compare" as const, label: "Compare", icon: ArrowUpDown },
  ];

  const externalTabs = [
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/events", label: "Events", icon: Calendar },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold via-gold-light to-gold backdrop-blur-sm border border-gold/50 shadow-lg shadow-gold/20">
              <span className="text-lg font-black text-primary-foreground tracking-tighter">Au</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Au<span className="text-primary">Xio</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {inPageTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`gap-2 ${
                  activeTab === tab.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
            {externalTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 gap-2 ${isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="glass border-t border-white/10 p-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {inPageTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`justify-start gap-3 ${
                    activeTab === tab.id
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </Button>
              ))}
              {externalTabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 gap-3 ${isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                    `}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom">
        <div className="flex h-16 items-center justify-around">
          {inPageTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}
                `}
              >
                <tab.icon
                  className={`h-5 w-5 ${isActive ? "text-primary" : ""}`}
                />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="absolute top-0 h-0.5 w-12 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
          {externalTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}
                `}
              >
                <tab.icon
                  className={`h-5 w-5 ${isActive ? "text-primary" : ""}`}
                />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="absolute top-0 h-0.5 w-12 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
