import authMutation from "./authMutation";
import postMutation from "./postMutation";

export const Mutation = {
  ...postMutation,
  ...authMutation,
};
