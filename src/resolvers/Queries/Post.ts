import { userLoader } from "../../loaders/userLoader";

interface ParentPostType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  published: boolean;
  authorId: number;
}

export const Post = {
  user: (parent: ParentPostType, _: any, context: any) => {
    return userLoader.load(parent.authorId);
  },
};
