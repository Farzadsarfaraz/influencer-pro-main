import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/* ADD FAVORITE */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { influencerId } = await req.json();

  if (!influencerId) {
    return NextResponse.json(
      { error: "Influencer ID is required" },
      { status: 400 }
    );
  }

  const existing = await prisma.favorite.findFirst({
    where: {
      userId: session.user.id,
      influencerId,
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Already in favorites" },
      { status: 400 }
    );
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: session.user.id,
      influencerId,
    },
  });

  return NextResponse.json(favorite, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { influencerId } = await req.json();

  await prisma.favorite.deleteMany({
    where: {
      userId: session.user.id,
      influencerId,
    },
  });

  return NextResponse.json({ success: true });
}
