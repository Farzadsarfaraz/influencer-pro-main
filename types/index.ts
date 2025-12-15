export interface Influencer {
  id: string;
  externalId?: string | null;   // allow null
  name: string;
  handle: string;
  platform: string[];
  followers: number;
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
  topics: string[];
  location: string;
  gender?: string | null;  
  age?: number | null;      
  avatar?: string | null;     
  bio?: string | null;         
  email?: string | null;    
  website?: string | null;  
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name?: string | null;
  email: string | null;
  image?: string | null;
}

export interface Favorite {
  id: string;
  userId: string;
  influencerId: string;
  createdAt: Date;
  influencer?: Influencer | null;
}