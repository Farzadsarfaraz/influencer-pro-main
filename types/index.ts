export interface Influencer {
  id: string;
  externalId?: string;
  name: string;
  handle: string;
  platform: string[];
  followers: number;
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
  topics: string[];
  location: string;
  gender?: string;
  age?: number;
  avatar?: string;
  bio?: string;
  email?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  influencerId: string;
  createdAt: Date;
  influencer?: Influencer;
}