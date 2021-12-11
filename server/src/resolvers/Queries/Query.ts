import { Context } from "../../server";

export const Query = {
  me: (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: { id: userInfo.userId },
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma }: Context
  ) => {
    return prisma.profile.findUnique({ where: { userId: Number(userId) } });
  },
  posts: (
    _: any,
    { take, skip }: { take: number; skip: number },
    { prisma }: Context
  ) => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: "desc" }],
      take,
      skip,
    });
  },
};
