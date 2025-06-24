"use client";

import { User } from "@/src/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  users: {
    user: User | null;
    showDialog: boolean;
  };
}

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    showDialog: false,
  },
  reducers: {
    setUserDialog: (state, action) => {
      state.user = action.payload.user;
      state.showDialog = action.payload.show;
    },
  },
});

export const { setUserDialog } = userSlice.actions;

export const selectedUser = (state: IUser) => state.users.user;
export const showUserDialog = (state: IUser) => state.users.showDialog;

export default userSlice.reducer;
