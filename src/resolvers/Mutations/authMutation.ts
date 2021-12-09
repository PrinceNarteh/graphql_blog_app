import { Prisma, User } from ".prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { JWT_KEY } from "../../keys";
import { Context } from "../../server";

interface SignUpArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

interface SignInArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface AuthPayloadType {
  userErrors: {
    message: string;
  }[];
  token: string | Prisma.Prisma__UserClient<User> | null;
}

const generateToken = (user: User): string => {
  return jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: 3600 });
};

export default {
  signUp: async (
    _: any,
    { credentials, bio, name }: SignUpArgs,
    { prisma }: Context
  ): Promise<AuthPayloadType> => {
    const { email, password } = credentials;
    const isEmail = validator.isEmail(email);
    if (!isEmail)
      return {
        userErrors: [{ message: "Please provide a valid email" }],
        token: null,
      };

    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      return {
        userErrors: [{ message: "Email already in use." }],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, { min: 5 });
    if (!isValidPassword)
      return {
        userErrors: [{ message: "Password too short" }],
        token: null,
      };

    if (!name || !bio)
      return {
        userErrors: [{ message: "Invalid Name or Bio" }],
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

    await prisma.profile.create({ data: { bio, userId: user.id } });

    const token = generateToken(user);

    return {
      userErrors: [],
      token,
    };
  },
  signIn: async (
    _: any,
    { credentials }: SignInArgs,
    { prisma }: Context
  ): Promise<AuthPayloadType> => {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        userErrors: [{ message: "Invalid credentials" }],
        token: null,
      };
    }

    if (user && !(await bcrypt.compare(password, user.password))) {
      return {
        userErrors: [{ message: "Invalid credentials" }],
        token: null,
      };
    }

    const token = generateToken(user);
    return {
      userErrors: [],
      token,
    };
  },
};
