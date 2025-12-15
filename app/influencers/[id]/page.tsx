import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import InfluencerDetail from '@/components/InfluencerDetail';
import { 
  Instagram, 
  Youtube, 
  Twitter,
  Twitch,
  Globe,
  Users,
  BarChart3,
  MapPin,
  Calendar,
  Users2,
  MessageSquare,
  Heart
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InfluencerDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  const influencer = await prisma.influencer.findUnique({
    where: { id: resolvedParams.id },
    include: {
      favorites: {
        where: {
          userId: session?.user?.id,
        },
      },
    },
  });

  if (!influencer) {
    notFound();
  }

  const isFavorite = influencer.favorites.length > 0;
  const formattedFollowers = influencer.followers.toLocaleString();
  const engagementRate = influencer.engagementRate.toFixed(1);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'YouTube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'Twitch':
        return <Twitch className="h-5 w-5 text-purple-600" />;
      case 'TikTok':
        return <span className="text-black font-bold text-sm">TT</span>;
      default:
        return <Users2 className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex flex-col space-x-6 space-y-4">
              <div className="h-40 w-40 rounded-full border-4 border-white overflow-hidden">
                <img
                  src={influencer.avatar || "/default-avatar.png"}
                  alt={influencer.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{influencer.name}</h1>
                <p className="text-xl opacity-90">@{influencer.handle}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4" />
                    <span>{formattedFollowers} followers</span>
                  </span>
                  <span className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <BarChart3 className="h-4 w-4" />
                    <span>{engagementRate}% engagement</span>
                  </span>
                  {influencer.age && (
                    <span className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                      <Calendar className="h-4 w-4" />
                      <span>{influencer.age} years</span>
                    </span>
                  )}
                  {influencer.gender && (
                    <span className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                      <Users2 className="h-4 w-4" />
                      <span>{influencer.gender}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <InfluencerDetail 
              influencer={influencer} 
              isFavorite={isFavorite} 
              userId={session?.user?.id}
            />
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {influencer.bio || 'No bio available.'}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-sm text-blue-600 font-medium mb-1">Platforms</div>
                  <div className="space-y-2">
                    {Array.isArray(influencer.platform) && influencer.platform.map((platform, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getPlatformIcon(platform)}
                        <span className="font-semibold text-gray-800 text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-sm text-purple-600 font-medium mb-1">Topics</div>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(influencer.topics) && influencer.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-green-600 font-medium mb-1">Location</div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-gray-800">{influencer.location}</span>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-sm text-orange-600 font-medium mb-1">Engagement</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Avg. Likes</span>
                      <span className="font-semibold text-sm">{influencer.avgLikes?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Avg. Comments</span>
                      <span className="font-semibold text-sm">{influencer.avgComments?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Links</h3>
                
                <div className="space-y-4">
                  {influencer.email && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <a 
                        href={`mailto:${influencer.email}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {influencer.email}
                      </a>
                    </div>
                  )}

                  {influencer.website && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Website</div>
                      <a 
                        href={influencer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Visit Website</span>
                      </a>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Social Media</div>
                    <div className="flex flex-wrap gap-3">
                      {Array.isArray(influencer.platform) && influencer.platform.map((platform, index) => {
                        let url = '';
                        let icon = null;
                        
                        switch (platform) {
                          case 'Instagram':
                            url = `https://instagram.com/${influencer.handle}`;
                            icon = <Instagram className="h-5 w-5 text-pink-600" />;
                            break;
                          case 'YouTube':
                            url = `https://youtube.com/${influencer.handle}`;
                            icon = <Youtube className="h-5 w-5 text-red-600" />;
                            break;
                          case 'Twitter':
                            url = `https://twitter.com/${influencer.handle}`;
                            icon = <Twitter className="h-5 w-5 text-blue-400" />;
                            break;
                          case 'Twitch':
                            url = `https://twitch.tv/${influencer.handle}`;
                            icon = <Twitch className="h-5 w-5 text-purple-600" />;
                            break;
                          case 'TikTok':
                            url = `https://tiktok.com/@${influencer.handle}`;
                            icon = <span className="h-5 w-5 flex items-center justify-center text-black font-bold text-sm">TT</span>;
                            break;
                          default:
                            return null;
                        }
                        
                        return (
                          <a 
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                            title={`${influencer.name} on ${platform}`}
                          >
                            {icon}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Avg. Comments</span>
                    </span>
                    <span className="font-semibold">
                      {influencer.avgComments?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Avg. Likes</span>
                    </span>
                    <span className="font-semibold">
                      {influencer.avgLikes?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-semibold text-green-600">{engagementRate}%</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Estimated Reach</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(influencer.followers * (influencer.engagementRate / 100)).toLocaleString()}
                      <span className="text-sm text-gray-500 ml-1">people</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}