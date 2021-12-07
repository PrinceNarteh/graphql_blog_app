import { Context } from "../server";

export const Query = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
  },
};
