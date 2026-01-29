import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UserListingProps {
  name: string;
  location: string;
  bio: string;
  tradeOffers: string;
  imageUrl: string;
}

export function UserListing({ name, location, bio, tradeOffers, imageUrl }: UserListingProps) {
  return (
    <Card className="glass-card p-4 flex items-start space-x-4 rounded-xl">
      <CardContent className="p-0 flex flex-grow items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            width={60}
            height={60}
            className="rounded-full object-cover border border-white/10"
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <button className="bg-primary hover:bg-primary-dark text-primary-foreground text-xs font-bold py-1 px-2 rounded">
              Contact {name.split(' ')[0]}
            </button>
          </div>
          <p className="text-muted-foreground flex items-center text-xs mt-1">
            <MapPin className="h-3 w-3 mr-1 text-primary" /> {location}
          </p>
          <p className="text-foreground mt-2 text-sm">{bio}</p>
          <p className="text-muted-foreground italic text-xs mt-1">
            Specializing in: {tradeOffers}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}