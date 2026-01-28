import Image from "next/image";
import { MapPin } from "lucide-react";

interface UserListingProps {
  name: string;
  location: string;
  bio: string;
  tradeOffers: string;
  imageUrl: string;
}

export function UserListing({ name, location, bio, tradeOffers, imageUrl }: UserListingProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-600 flex items-center text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1 text-gray-500" /> {location}
        </p>
        <p className="text-gray-800 mt-2 text-sm">{bio}</p>
        <p className="text-gray-600 italic text-sm mt-1">
          Specializing in: {tradeOffers}
        </p>
        <button className="mt-3 bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1.5 px-3 rounded">
          Contact {name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
}