/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IChangePasswordSchema,
  ILoginSchema,
  IPasswordResetSchema,
  ISignupSchema,
  IVerifyEmailSchema,
} from "@/src/validations/auth-validations";
import apiSlice from "../api-slice";
import { apiRoutes } from "@/src/paths/apiRoutes";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, ILoginSchema>({
      query: (body) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<any, ISignupSchema>({
      query: (body) => ({
        url: apiRoutes.auth.signup,
        method: "POST",
        body,
      }),
    }),
    verifyEmailAddress: builder.mutation<any, IVerifyEmailSchema>({
      query: (body) => ({
        url: apiRoutes.auth.validate_account,
        method: "POST",
        body,
      }),
    }),
    passwordResetRequest: builder.mutation<any, string>({
      query: (email) => ({
        url: `${apiRoutes.auth.reset_password_request}/${email}`,
        method: "POST",
        body: {},
      }),
    }),
    isPasswordResetTokenValid: builder.mutation<
      any,
      { code: string; email: string }
    >({
      query: (body) => ({
        url: apiRoutes.auth.token_exists,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<any, IPasswordResetSchema>({
      query: (body) => ({
        url: apiRoutes.auth.reset_password,
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation<any, IChangePasswordSchema>({
      query: (body) => ({
        url: apiRoutes.auth.change_password,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyEmailAddressMutation,
  usePasswordResetRequestMutation,
  useIsPasswordResetTokenValidMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApiSlice;
