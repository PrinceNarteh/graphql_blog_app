import jwt from "jsonwebtoken";
import { JWT_KEY } from "../keys";

interface TokenPayload {
  userErrors: {
    message: string;
  }[];
  token: string | jwt.JwtPayload | null;
}

export const getUserFromToken = async (req: any): Promise<TokenPayload> => {
  if (!req.headers["authorization"])
    return {
      userErrors: [{ message: "Unauthorized" }],
      token: null,
    };

  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    return {
      userErrors: [],
      token: decodedToken,
    };
  } catch (error: any) {
    if (error.message === "invalid signature") {
      return {
        userErrors: [{ message: "Internal server error" }],
        token: null,
      };
    }
    return {
      userErrors: [{ message: error.message }],
      token: null,
    };
  }
};
