import { User } from ".prisma/client";
import bcrypt from "bcryptjs";
import validator from "validator";
import { Context } from "../../server";

interface SignUpArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

interface AuthPayloadType {
  userErrors: {
    message: string;
  }[];
  user: User | null;
}

export default {
  signUp: async (
    _: any,
    { name, email, password, bio }: SignUpArgs,
    { prisma }: Context
  ): Promise<AuthPayloadType> => {
    const isEmail = validator.isEmail(email);
    if (!isEmail)
      return {
        userErrors: [
          {
            message: "Please provide a valid email",
          },
        ],
        user: null,
      };

    const isValidPassword = validator.isLength(password, { min: 5 });
    if (!isValidPassword)
      return {
        userErrors: [
          {
            message: "Password too short",
          },
        ],
        user: null,
      };

    if (!name || !bio)
      return {
        userErrors: [
          {
            message: "Invalid Name or Bio",
          },
        ],
        user: null,
      };

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      userErrors: [],
      user: null,
    };
  },
};
