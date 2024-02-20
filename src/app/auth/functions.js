"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getServerAuthSession = async () => {
  return await getServerSession(authOptions);
};
