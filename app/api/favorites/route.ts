// app/api/favorites/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    console.log('--- Favorites API Debug ---');
    
    // Get session
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    console.log('Session user ID:', session?.user?.id);
    
    if (!session?.user?.id) {
      console.log('No user ID in session');
      return NextResponse.json({ 
        error: 'Unauthorized - Please log in first' 
      }, { status: 401 });
    }

    // Check if user exists in database
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    
    console.log('User exists in DB:', !!userExists);
    
    if (!userExists) {
      console.log('User not found in database - ID:', session.user.id);
      return NextResponse.json({ 
        error: 'User not found in database' 
      }, { status: 404 });
    }

    const { influencerId } = await req.json();
    console.log('Influencer ID:', influencerId);

    if (!influencerId) {
      return NextResponse.json(
        { error: 'Influencer ID is required' },
        { status: 400 }
      );
    }

    // Rest of your existing code...
    const influencer = await prisma.influencer.findUnique({
      where: { id: influencerId },
    });

    if (!influencer) {
      return NextResponse.json(
        { error: 'Influencer not found' },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: session.user.id,
        influencerId,
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Already in favorites' },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        influencerId,
      },
      include: {
        influencer: true,
      },
    });

    console.log('Favorite created successfully:', favorite.id);
    return NextResponse.json(favorite, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating favorite:', error);
    
    // More detailed error response
    if (error.code === 'P2003') {
      return NextResponse.json(
        { 
          error: 'Database constraint error',
          details: 'The user or influencer does not exist',
          code: error.code 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}