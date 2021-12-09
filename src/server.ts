import { Prisma, PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import * as resolvers from "./resolvers";
import { typeDefs } from "./schema";
import { getUserFromToken } from "./utils/getUserFromToken";

const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  };
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...resolvers,
  },
  context: async ({ req }) => {
    const { token: userInfo } = await getUserFromToken(req);

    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
