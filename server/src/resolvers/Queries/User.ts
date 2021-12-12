import { Context } from "../../server";

type ParentType = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const User = {
  posts: (
    parent: ParentType,
    { take, skip }: { take: number; skip: number },
    { prisma, userInfo }: Context
  ) => {
    const isOwnProfile = parent.id === userInfo?.userId;
    if (isOwnProfile) {
      return prisma.post.findMany({
        where: { authorId: parent.id },
        orderBy: [{ createdAt: "desc" }],
        take,
        skip,
      });
    } else {
      return prisma.post.findMany({
        where: { authorId: parent.id, published: true },
        orderBy: [{ createdAt: "desc" }],
        take,
        skip,
      });
    }
  },
};
