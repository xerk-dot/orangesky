import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
}); 