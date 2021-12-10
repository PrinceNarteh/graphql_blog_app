import { Context } from "../../server";

interface ParentPostType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  published: boolean;
  authorId: number;
}

export const Post = {
  user: (parent: ParentPostType, _: any, { prisma }: Context) => {
    console.log(parent);
    return prisma.user.findUnique({ where: { id: parent.authorId } });
  },
};
