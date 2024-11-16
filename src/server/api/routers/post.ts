import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
});
