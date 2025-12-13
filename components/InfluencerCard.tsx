"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Users, 
  BarChart3,
  MapPin
} from 'lucide-react';
import { Influencer } from '@/types';

interface InfluencerCardProps {
  influencer: Influencer & { isFavorite?: boolean };
}

export default function InfluencerCard({ influencer }: InfluencerCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(influencer.id));
  }, [influencer.id]);

  const formattedFollowers = influencer.followers.toLocaleString();
  const engagementRate = influencer.engagementRate.toFixed(1);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isFavorite) {
        const response = await fetch(`/api/favorites/${influencer.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to remove favorite');
        }
        
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favorites.filter((id: string) => id !== influencer.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        
        setIsFavorite(false);
      } else {
        const response = await fetch(`/api/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ influencerId: influencer.id }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          if (data.error === 'Already in favorites') {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (!favorites.includes(influencer.id)) {
              localStorage.setItem('favorites', JSON.stringify([...favorites, influencer.id]));
            }
            setIsFavorite(true);
            return;
          }
          throw new Error(data.error || 'Failed to add favorite');
        }
        
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(influencer.id)) {
          localStorage.setItem('favorites', JSON.stringify([...favorites, influencer.id]));
        }
        
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
      

      if (error instanceof Error) {
        if (error.message.includes('Already in favorites')) {

          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          if (!favorites.includes(influencer.id)) {
            localStorage.setItem('favorites', JSON.stringify([...favorites, influencer.id]));
          }
          setIsFavorite(true);
        } else {

          alert(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={() => router.push(`/influencers/${influencer.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
    >

      <div className="relative h-48 overflow-hidden">
        <img
          src={influencer.avatar || "/default-avatar.png"}
          alt={influencer.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <button
          onClick={handleFavorite}
          disabled={isLoading}
          className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
            isFavorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 truncate">{influencer.name}</h3>
          <p className="text-gray-500 text-sm">@{influencer.handle}</p>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {influencer.bio || 'No bio available'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-500">Followers</div>
              <div className="font-semibold text-sm">{formattedFollowers}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-xs text-gray-500">Engagement</div>
              <div className="font-semibold text-sm">{engagementRate}%</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(influencer.platform) && influencer.platform.slice(0, 2).map((platform, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {platform}
            </span>
          ))}
          {Array.isArray(influencer.platform) && influencer.platform.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{influencer.platform.length - 2}
            </span>
          )}
        </div>


        <div className="flex flex-wrap gap-2">
          {Array.isArray(influencer.topics) && influencer.topics.slice(0, 2).map((topic, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {topic}
            </span>
          ))}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <MapPin className="h-3 w-3 mr-1" />
            {influencer.location.split(',')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}