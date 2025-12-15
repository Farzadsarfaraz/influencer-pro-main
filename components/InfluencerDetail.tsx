"use client";

import { useState } from 'react';
import { Heart, Mail, Globe, Share2 } from 'lucide-react';
import { Influencer } from '@/types';

interface InfluencerDetailProps {
  influencer: Influencer;
  isFavorite: boolean;
  userId?: string;
}

export default function InfluencerDetail({ influencer, isFavorite, userId }: InfluencerDetailProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      if (favorite) {
        const response = await fetch(`/api/favorites/${influencer.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }
      } else {
        const response = await fetch(`/api/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ influencerId: influencer.id }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to add favorite');
        }
      }
      setFavorite(!favorite);
    } catch (error) {
      console.error('Failed to update favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: influencer.name,
        text: `Check out ${influencer.name} on InfluencerHub`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleContact = () => {
    if (influencer.email) {
      window.location.href = `mailto:${influencer.email}`;
    } else {
      alert('No contact email available for this influencer');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleToggleFavorite}
          disabled={loading || !userId}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            favorite
              ? 'bg-white text-red-600 hover:bg-red-50'
              : 'bg-white text-blue-600 hover:bg-gray-100'
          } ${!userId ? 'opacity-50 cursor-not-allowed' : ''} disabled:opacity-50`}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
          <span>{favorite ? 'Remove Favorite' : 'Add to Favorites'}</span>
        </button>

        <button
          onClick={handleContact}
          disabled={!influencer.email}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            influencer.email
              ? 'bg-white text-blue-600 hover:bg-gray-100'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Mail className="h-5 w-5" />
          <span>Contact</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition-colors"
        >
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {influencer.engagementRate.toFixed(1)}%
            </div>
            <div className="text-sm text-white/80">Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {influencer.avgLikes?.toLocaleString() || 'N/A'}
            </div>
            <div className="text-sm text-white/80">Avg. Likes</div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Platforms</span>
            <span className="font-semibold text-white">
              {Array.isArray(influencer.platform) ? influencer.platform.join(', ') : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Topics</span>
            <span className="font-semibold text-white">
              {Array.isArray(influencer.topics) ? influencer.topics.join(', ') : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Location</span>
            <span className="font-semibold text-white">{influencer.location}</span>
          </div>
          {influencer.age && (
            <div className="flex justify-between items-center">
              <span className="text-white/80">Age</span>
              <span className="font-semibold text-white">{influencer.age}</span>
            </div>
          )}
        </div>
      </div>
      {influencer.website && (
        <div className="pt-4 border-t border-white/20">
          <a
            href={influencer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors"
          >
            <Globe className="h-5 w-5" />
            <span className="font-medium">Visit Website</span>
          </a>
        </div>
      )}
    </div>
  );
}