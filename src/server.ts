import { Prisma, PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import * as resolvers from "./resolvers";
import { typeDefs } from "./schema";

const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...resolvers,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
