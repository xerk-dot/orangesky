import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.blueskyUser.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        did: true,
        handle: true,
        displayName: true,
        numOfFollowers: true,
        numOfFollowing: true,
      },
    });
  }),
  count: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.blueskyUser.count();
  }),
}); 