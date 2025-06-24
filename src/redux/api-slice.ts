"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getPlainCookie } from "../lib/handle-jwt";

// let jwtSession: string | null | undefined = null;

export const handleGetCookie = async () => {
  const session = await getPlainCookie();
  if (!session) return null;
  return session;
};

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DEV_API_URL,
    // credentials: "include",
    prepareHeaders: async (headers) => {
      if (typeof window !== "undefined") {
        const jwtSession = await handleGetCookie();
        if (jwtSession === null) return headers;
        headers.set("Authorization", `Bearer ${jwtSession}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default apiSlice;
