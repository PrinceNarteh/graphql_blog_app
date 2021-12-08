import { Context } from "../../server";

export const RootQuery = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
  },
};
