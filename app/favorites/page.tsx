import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import InfluencerGrid from '@/components/InfluencerGrid';
import { Heart } from 'lucide-react';

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      influencer: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const influencers = favorites.map(fav => ({
    ...fav.influencer,
    isFavorite: true,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">
            {influencers.length} influencer{influencers.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-red-600">
          <Heart className="h-6 w-6" />
          <span className="text-lg font-semibold">{influencers.length}</span>
        </div>
      </div>

      {influencers.length > 0 ? (
        <InfluencerGrid influencers={influencers} />
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-red-50 rounded-full mb-6">
            <Heart className="h-10 w-10 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Start discovering influencers and add them to your favorites to see them here.
          </p>
          <a
            href="/influencers"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Explore Influencers
          </a>
        </div>
      )}
    </div>
  );
}