/* eslint-disable @typescript-eslint/no-explicit-any */

import { filterParams } from "@/src/lib/filter-query-params";
import { apiRoutes } from "@/src/paths/apiRoutes";
import { ItemsPagination, User } from "@/src/types/user";
import { IUserSchema } from "@/src/validations/user-validation";
import apiSlice from "../api-slice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<ItemsPagination<User>, any>({
      query: (params) => {
        const validatedParams: any = filterParams(params);
        if (Object.keys(validatedParams).length > 0) {
          const queryString = new URLSearchParams(validatedParams).toString();
          return `${apiRoutes.users}?${queryString}`;
        }
        return apiRoutes.users;
      },
      transformResponse: (response: { data: ItemsPagination<User> }) =>
        response.data,
    }),
    createUser: builder.mutation<any, IUserSchema>({
      query: (body) => ({
        url: apiRoutes.users,
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<any, IUserSchema>({
      query: (body) => ({
        url: apiRoutes.users,
        method: "PUT",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
