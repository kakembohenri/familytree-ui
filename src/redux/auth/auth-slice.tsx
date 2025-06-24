"use client";

import { User } from "@/src/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  user: User | null | undefined;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export const selectUser = (state: { auth: IAuthState }) => state.auth.user;

export default authSlice.reducer;
