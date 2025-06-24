import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api-slice";
import treeReducer from "./tree/tree-slice";
import userReducer from "./user/user-slice";
import authReducer from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    tree: treeReducer,
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
