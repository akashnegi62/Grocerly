/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { headers } from "next/headers";

export const getUserFromToken = async (req: Request) => {
  const authHeader = (await headers()).get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Not authorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
  };

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("User not found");

  return user;
};
