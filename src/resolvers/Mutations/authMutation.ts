import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { JWT_KEY } from "../../keys";
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
  token: string | null;
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
        token: null,
      };

    const isValidPassword = validator.isLength(password, { min: 5 });
    if (!isValidPassword)
      return {
        userErrors: [
          {
            message: "Password too short",
          },
        ],
        token: null,
      };

    if (!name || !bio)
      return {
        userErrors: [
          {
            message: "Invalid Name or Bio",
          },
        ],
        token: null,
      };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_KEY,
      { expiresIn: 3600 }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
