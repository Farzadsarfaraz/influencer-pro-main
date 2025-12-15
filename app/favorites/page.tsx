import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InfluencerGrid from "@/components/InfluencerGrid";
import { Heart } from "lucide-react";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Please login</h2>
          <p className="text-gray-500 mt-2">Login to view your favorites</p>
        </div>
      </div>
    );
  }
  
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      influencer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const influencers = favorites.map((fav) => ({
    ...fav.influencer,
    isFavorite: true,
  }));
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">
            {influencers.length} influencer{influencers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-red-600">
          <Heart className="h-6 w-6" />
          <span className="text-lg font-semibold">{influencers.length}</span>
        </div>
      </div>
      <InfluencerGrid influencers={influencers} />
    </div>
  );
}