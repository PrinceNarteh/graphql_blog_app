import { Post, Prisma } from ".prisma/client";
import { Context } from "../../server";

interface PostCreateArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export default {
  postCreate: async (
    _: any,
    { post }: PostCreateArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!title || !content) {
      return {
        userErrors: [
          { message: "You must provide a title and content to create a post" },
        ],
        post: null,
      };
    }

    console.log(userInfo);

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId,
      },
    });

    return {
      userErrors: [],
      post: newPost,
    };
  },
  postUpdate: async (
    _: any,
    { postId, post }: { postId: string; post: PostCreateArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title && !content) {
      return {
        userErrors: [{ message: "Need to have at least one field to update." }],
        post: null,
      };
    }
    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!existingPost) {
      return {
        userErrors: [{ message: "Post does not exist." }],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

    return {
      userErrors: [],
      post: prisma.post.update({
        data: { ...payloadToUpdate },
        where: {
          id: Number(postId),
        },
      }),
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });
    if (!post) {
      return {
        userErrors: [{ message: "Post does not exist." }],
        post: null,
      };
    }
    await prisma.post.delete({ where: { id: Number(postId) } });
    return {
      userErrors: [],
      post,
    };
  },
};
