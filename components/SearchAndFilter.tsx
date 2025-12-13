"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchAndFilterProps {
  topics: string[];
  platforms: string[];
  locations: string[];
  genders: string[];
}

export default function SearchAndFilter({ topics, platforms, locations, genders }: SearchAndFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [topic, setTopic] = useState(searchParams.get('topic') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [location, setLocation] = useState(searchParams.get('location') || 'all');
  const [gender, setGender] = useState(searchParams.get('gender') || 'all');
  const [minFollowers, setMinFollowers] = useState(searchParams.get('minFollowers') || '');
  const [maxFollowers, setMaxFollowers] = useState(searchParams.get('maxFollowers') || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (search) params.set('search', search);
    if (topic && topic !== 'all') params.set('topic', topic);
    if (platform && platform !== 'all') params.set('platform', platform);
    if (location && location !== 'all') params.set('location', location);
    if (gender && gender !== 'all') params.set('gender', gender);
    if (minFollowers) params.set('minFollowers', minFollowers);
    if (maxFollowers) params.set('maxFollowers', maxFollowers);

    const timeoutId = setTimeout(() => {
      router.push(`/influencers?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, topic, platform, location, gender, minFollowers, maxFollowers, router]);

  const clearFilters = () => {
    setSearch('');
    setTopic('all');
    setPlatform('all');
    setLocation('all');
    setGender('all');
    setMinFollowers('');
    setMaxFollowers('');
    router.push('/influencers');
  };

  const hasFilters = topic !== 'all' || platform !== 'all' || location !== 'all' || 
                     gender !== 'all' || minFollowers || maxFollowers;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search influencers by name, handle, or bio..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors ${
            showFilters || hasFilters
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          {hasFilters && (
            <span className="h-5 w-5 bg-white text-blue-600 rounded-full text-xs flex items-center justify-center">
              !
            </span>
          )}
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-2 transition-colors"
          >
            <X className="h-5 w-5" />
            <span>Clear</span>
          </button>
        )}
      </div>
      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
              >
                <option value="all">All Topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
              >
                <option value="all">All Platforms</option>
                {platforms.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
              >
                <option value="all">All Genders</option>
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Followers
              </label>
              <input
                type="number"
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Followers
              </label>
              <input
                type="number"
                value={maxFollowers}
                onChange={(e) => setMaxFollowers(e.target.value)}
                placeholder="1000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}