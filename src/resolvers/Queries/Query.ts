import { Context } from "../../server";

export const RootQuery = {
  me: (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: { id: userInfo.userId },
    });
  },
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
  },
};
