import { prisma } from "~/server/db";

export async function GET() {
  try {
    const count = await prisma.BlueskyUser.count();
    return Response.json({ count });
  } catch (error) {
    console.error('Error getting count:', error);
    return Response.json({ count: 0 }, { status: 500 });
  }
} 