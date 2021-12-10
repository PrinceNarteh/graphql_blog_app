import { Context } from "../../server";

export const User = {
  posts: (parent: any, _: any, { prisma, userInfo }: Context) => {
    const isOwnProfile = parent.id === userInfo.userId;
    if (isOwnProfile) {
      return prisma.post.findMany({
        where: { authorId: parent.id },
        orderBy: [{ createdAt: "desc" }],
      });
    } else {
      return prisma.post.findMany({
        where: { authorId: parent.id, published: true },
        orderBy: [{ createdAt: "desc" }],
      });
    }
  },
};
