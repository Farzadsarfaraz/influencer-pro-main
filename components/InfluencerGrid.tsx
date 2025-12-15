"use client";

import InfluencerCard from "./InfluencerCard";
import { Influencer } from "@/types";

interface InfluencerGridProps {
  influencers: (Influencer & { isFavorite?: boolean })[];
}

export default function InfluencerGrid({ influencers }: InfluencerGridProps) {
  if (influencers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          No influencers found
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {influencers.map(influencer => (
        <InfluencerCard
          key={influencer.id}
          influencer={influencer}
        />
      ))}
    </div>
  );
}
