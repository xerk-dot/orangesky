import { db } from "~/server/db";

export async function GET() {
  try {
    const count = await db.blueskyUser.count();
    return Response.json({ count });
  } catch (error) {
    console.error('Error getting count:', error);
    return Response.json({ count: 0 }, { status: 500 });
  }
} 