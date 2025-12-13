import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const influencers = [
  {
    externalId: "inf_001",
    name: "LinaGlow",
    handle: "linaglow",
    platform: ["Instagram", "YouTube"],
    followers: 125000,
    engagementRate: 3.8,
    avgLikes: 4200,
    avgComments: 180,
    topics: ["Beauty", "Vegan", "Skincare"],
    location: "Berlin, Germany",
    gender: "female",
    age: 27,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    bio: "Beauty influencer sharing vegan skincare tips and makeup tutorials",
    email: "contadct@linaglow.com",  
    website: "https://linaglow.com"   
  },
  {
    externalId: "inf_002",
    name: "FitWithMax",
    handle: "fitwithmax",
    platform: ["YouTube", "TikTok"],
    followers: 98000,
    engagementRate: 6.2,
    avgLikes: 5200,
    avgComments: 350,
    topics: ["Fitness", "Nutrition", "Wellness"],
    location: "Munich, Germany",
    gender: "male",
    age: 31,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Fitness coach helping people achieve their health goals",
    email: "contact2@linaglow.com",  
    website: "https://linaglow.com"   
  },
  {
    externalId: "inf_003",
    name: "GreenMind",
    handle: "greenmind",
    platform: ["TikTok", "Instagram"],
    followers: 210000,
    engagementRate: 8.5,
    avgLikes: 15000,
    avgComments: 500,
    topics: ["Sustainability", "Zero Waste", "DIY"],
    location: "Hamburg, Germany",
    gender: "male",
    age: 25,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Sustainability advocate sharing eco-friendly lifestyle tips",
    email: "contac3t@linaglow.com",  
    website: "https://linaglow.com"   
  },
  {
    externalId: "inf_004",
    name: "MomsAndMore",
    handle: "momsandmore",
    platform: ["Instagram"],
    followers: 74000,
    engagementRate: 4.1,
    avgLikes: 2100,
    avgComments: 110,
    topics: ["Parenting", "Lifestyle", "Home"],
    location: "Cologne, Germany",
    gender: "female",
    age: 34,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Parenting expert sharing tips for modern families",
    email: "contact4@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_005",
    name: "TechDude",
    handle: "techdude",
    platform: ["YouTube"],
    followers: 163000,
    engagementRate: 5.0,
    avgLikes: 4300,
    avgComments: 290,
    topics: ["Tech", "Gadgets", "Gaming"],
    location: "Stuttgart, Germany",
    gender: "male",
    age: 29,
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop",
    bio: "Tech enthusiast reviewing the latest gadgets and games",
    email: "contact5@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_006",
    name: "AnnaJourney",
    handle: "annajourney",
    platform: ["Instagram", "TikTok"],
    followers: 92000,
    engagementRate: 2.5,
    avgLikes: 2700,
    avgComments: 140,
    topics: ["Travel", "Photography", "Adventure"],
    location: "Hamburg, Germany",
    gender: "female",
    age: 28,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Travel blogger exploring hidden gems around the world",
    email: "contact6@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_007",
    name: "ChrisFit",
    handle: "chrisfit",
    platform: ["YouTube", "Instagram"],
    followers: 99000,
    engagementRate: 3.3,
    avgLikes: 2900,
    avgComments: 155,
    topics: ["Fitness", "Bodybuilding", "Motivation"],
    location: "Munich, Germany",
    gender: "male",
    age: 29,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Professional bodybuilder sharing workout routines and nutrition tips",
    email: "contact7@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_008",
    name: "MiraDIY",
    handle: "miradiy",
    platform: ["TikTok"],
    followers: 106000,
    engagementRate: 4.1,
    avgLikes: 3100,
    avgComments: 170,
    topics: ["DIY", "Crafts", "Upcycling"],
    location: "Cologne, Germany",
    gender: "female",
    age: 30,
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop",
    bio: "Creative DIY enthusiast transforming everyday items into art",
    email: "contac8t@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_009",
    name: "LeoTech",
    handle: "leotech",
    platform: ["YouTube", "Twitch"],
    followers: 113000,
    engagementRate: 4.9,
    avgLikes: 3300,
    avgComments: 185,
    topics: ["Tech", "Software Reviews", "Gadgets"],
    location: "Frankfurt, Germany",
    gender: "female",
    age: 31,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    bio: "Tech reviewer specializing in software and productivity tools",
    email: "contac9t@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_010",
    name: "NinaNature",
    handle: "ninanature",
    platform: ["Instagram", "YouTube", "TikTok"],
    followers: 120000,
    engagementRate: 5.7,
    avgLikes: 3500,
    avgComments: 200,
    topics: ["Travel", "Adventure", "Eco Living"],
    location: "Berlin, Germany",
    gender: "female",
    age: 32,
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    bio: "Adventure traveler promoting sustainable tourism and eco-living",
    email: "contact0@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_011",
    name: "TomTravel",
    handle: "tomtravel",
    platform: ["Instagram"],
    followers: 127000,
    engagementRate: 6.5,
    avgLikes: 3700,
    avgComments: 215,
    topics: ["Travel", "Culture", "Budget Trips"],
    location: "Hamburg, Germany",
    gender: "male",
    age: 33,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    bio: "Budget travel expert sharing affordable travel tips and cultural insights",
    email: "contac22t@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_012",
    name: "SophieStyle",
    handle: "sophiestyle",
    platform: ["TikTok", "YouTube"],
    followers: 134000,
    engagementRate: 2.5,
    avgLikes: 3900,
    avgComments: 230,
    topics: ["Fashion", "Beauty", "Lifestyle"],
    location: "Munich, Germany",
    gender: "female",
    age: 34,
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    bio: "Fashion influencer sharing style tips and beauty routines",
    email: "cont33act@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_013",
    name: "BenBuilds",
    handle: "benbuilds",
    platform: ["YouTube"],
    followers: 141000,
    engagementRate: 3.3,
    avgLikes: 4100,
    avgComments: 245,
    topics: ["Home Improvement", "DIY", "Woodworking"],
    location: "Cologne, Germany",
    gender: "male",
    age: 35,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Woodworking expert creating beautiful furniture and home improvements",
    email: "conta222ct@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_014",
    name: "EllaEats",
    handle: "ellaeats",
    platform: ["Instagram", "YouTube"],
    followers: 148000,
    engagementRate: 4.1,
    avgLikes: 4300,
    avgComments: 260,
    topics: ["Food", "Vegan", "Nutrition"],
    location: "Frankfurt, Germany",
    gender: "non-binary",
    age: 36,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    bio: "Vegan chef sharing delicious plant-based recipes and nutrition tips",
    email: "contac55t@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_015",
    name: "DavidDance",
    handle: "daviddance",
    platform: ["TikTok"],
    followers: 155000,
    engagementRate: 4.9,
    avgLikes: 4500,
    avgComments: 275,
    topics: ["Dance", "Choreography", "Fitness"],
    location: "Berlin, Germany",
    gender: "male",
    age: 22,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Professional dancer teaching choreography and dance fitness",
    email: "contact666@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_016",
    name: "FionaFilms",
    handle: "fionafilms",
    platform: ["YouTube", "Instagram"],
    followers: 162000,
    engagementRate: 5.7,
    avgLikes: 4700,
    avgComments: 290,
    topics: ["Filmmaking", "Vlogs", "Cinematography"],
    location: "Hamburg, Germany",
    gender: "female",
    age: 23,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    bio: "Award-winning filmmaker sharing cinematography tips and vlogging techniques",
    email: "contac777t@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_017",
    name: "JanGames",
    handle: "jangames",
    platform: ["Twitch"],
    followers: 169000,
    engagementRate: 6.5,
    avgLikes: 4900,
    avgComments: 305,
    topics: ["Gaming", "Esports", "Game Reviews"],
    location: "Munich, Germany",
    gender: "male",
    age: 24,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Professional gamer and esports commentator streaming live gameplay",
    email: "conta999ct@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_018",
    name: "LaraLife",
    handle: "laralife",
    platform: ["Instagram", "YouTube"],
    followers: 176000,
    engagementRate: 2.5,
    avgLikes: 5100,
    avgComments: 320,
    topics: ["Wellness", "Self-Care", "Productivity"],
    location: "Cologne, Germany",
    gender: "female",
    age: 25,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    bio: "Wellness coach focusing on self-care routines and productivity hacks",
    email: "conta0000ct@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_019",
    name: "MikeMusic",
    handle: "mikemusic",
    platform: ["TikTok", "Twitch"],
    followers: 183000,
    engagementRate: 3.3,
    avgLikes: 5300,
    avgComments: 335,
    topics: ["Music", "Songwriting", "Live Performances"],
    location: "Frankfurt, Germany",
    gender: "male",
    age: 26,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Singer-songwriter performing live and teaching music composition",
    email: "contac56757t@linaglow.com",  
    website: "https://linaglow.com" 
  },
  {
    externalId: "inf_020",
    name: "ZoeZen",
    handle: "zoezen",
    platform: ["Instagram", "TikTok"],
    followers: 190000,
    engagementRate: 4.1,
    avgLikes: 5500,
    avgComments: 350,
    topics: ["Mindfulness", "Meditation", "Yoga"],
    location: "Berlin, Germany",
    gender: "non-binary",
    age: 27,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    bio: "Mindfulness coach sharing meditation and yoga practices for mental health",
    email: "contac3563456t@linaglow.com",  
    website: "https://linaglow.com" 
  }
];

async function main() {
  console.log('Start seeding...');

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  console.log(`Created user: ${user.email}`);

  // Create influencers
  for (const influencerData of influencers) {
    const influencer = await prisma.influencer.upsert({
      where: { handle: influencerData.handle },
      update: {},
      create: influencerData,
    });
    console.log(`Created influencer: ${influencer.name}`);
  }

  console.log('Seeding finished. Created 20 influencers.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });