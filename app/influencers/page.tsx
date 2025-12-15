import InfluencerGrid from '@/components/InfluencerGrid';
import SearchAndFilter from '@/components/SearchAndFilter';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface SearchParams {
  search?: string;
  topic?: string;
  platform?: string;
  location?: string;
  gender?: string;
  minFollowers?: string;
  maxFollowers?: string;
}

function safeParseFollowers(value: string, defaultValue: number): number {
  const parsed = parseInt(value);
  if (isNaN(parsed)) return defaultValue;
  
  // Cap at maximum safe integer for database (2147483647 for PostgreSQL Int)
  const MAX_SAFE_INT = 2147483647;
  return Math.min(Math.max(parsed, 0), MAX_SAFE_INT);
}

export default async function InfluencersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const session = await getServerSession(authOptions);
  
  const params = await Promise.resolve(searchParams);
  
  const search = typeof params.search === 'string' ? params.search : '';
  const topic = typeof params.topic === 'string' ? params.topic : '';
  const platform = typeof params.platform === 'string' ? params.platform : '';
  const location = typeof params.location === 'string' ? params.location : '';
  const gender = typeof params.gender === 'string' ? params.gender : '';
  
  const minFollowersInput = typeof params.minFollowers === 'string' 
    ? safeParseFollowers(params.minFollowers, 0)
    : 0;
  
  const maxFollowersInput = typeof params.maxFollowers === 'string' 
    ? safeParseFollowers(params.maxFollowers, 1000000)
    : 1000000;


  const minFollowers = Math.min(minFollowersInput, maxFollowersInput);
  const maxFollowers = Math.max(minFollowersInput, maxFollowersInput);

  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { handle: { contains: search, mode: 'insensitive' } },
      { bio: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (topic && topic !== 'all') {
    where.topics = {
      has: topic,
    };
  }

  if (platform && platform !== 'all') {
    where.platform = {
      has: platform,
    };
  }

  if (location && location !== 'all') {
    where.location = location;
  }

  if (gender && gender !== 'all') {
    where.gender = gender;
  }

  let influencers = await prisma.influencer.findMany({
    where,
    include: {
      favorites: {
        where: {
          userId: session?.user?.id,
        },
      },
    },
    orderBy: {
      followers: 'desc',
    },
  });
  // Apply follower filter in JavaScript (to avoid integer overflow in database query)
  if (minFollowers > 0 || maxFollowers < 1000000) {
    influencers = influencers.filter(influencer => {
      const followers = influencer.followers;
      return followers >= minFollowers && followers <= maxFollowers;
    });
  }
  // Get unique values for filters
  const allInfluencers = await prisma.influencer.findMany({
    select: {
      topics: true,
      platform: true,
      location: true,
      gender: true,
    },
  });

  // Extract unique values
  const topics = Array.from(new Set(allInfluencers.flatMap(i => i.topics))).sort();
  const platforms = Array.from(new Set(allInfluencers.flatMap(i => i.platform))).sort();
  const locations = Array.from(new Set(allInfluencers.map(i => i.location))).sort();
  const genders = Array.from(new Set(allInfluencers.filter(i => i.gender).map(i => i.gender!))).sort();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Influencers</h1>
        <p className="text-gray-400">Browse and manage your favorite influencers</p>
      </div>

      <SearchAndFilter 
        topics={topics}
        platforms={platforms}
        locations={locations}
        genders={genders}
      />
      <InfluencerGrid 
        influencers={influencers.map(influencer => ({
          ...influencer,
          isFavorite: influencer.favorites.length > 0,
        }))} 
      />
    </div>
  );
}