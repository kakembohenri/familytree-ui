/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiRoutes } from "@/src/paths/apiRoutes";
import { FamilyNode } from "@/src/types/family-member";
import apiSlice from "../api-slice";
import {
  IAddMemberSchema,
  IUpdateMemberSchema,
} from "@/src/validations/family-member-validation";
import {
  IAddPartnerSchema,
  IEditPartnershipSchema,
} from "@/src/validations/partner-validation";

export const treeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTree: builder.query<FamilyNode | null, void>({
      query: () => {
        return apiRoutes.tree;
      },
      transformResponse: (response: { data: FamilyNode | null }) =>
        response.data,
    }),
    createFamilyMember: builder.mutation<any, IAddMemberSchema>({
      query: (body) => ({
        url: apiRoutes.members,
        method: "POST",
        body,
      }),
    }),
    createPartner: builder.mutation<any, IAddPartnerSchema>({
      query: (body) => ({
        url: apiRoutes.partner,
        method: "POST",
        body,
      }),
    }),
    updateFamilyMember: builder.mutation<any, IUpdateMemberSchema>({
      query: (body) => ({
        url: apiRoutes.members,
        method: "PUT",
        body,
      }),
    }),
    updatePartner: builder.mutation<any, IEditPartnershipSchema>({
      query: (body) => ({
        url: apiRoutes.partner,
        method: "PUT",
        body,
      }),
    }),
    removeMember: builder.mutation<any, number>({
      query: (id) => ({
        url: `${apiRoutes.members}?id=${id}`,
        method: "DELETE",
      }),
    }),
    uploadPhoto: builder.mutation<any, FormData>({
      query: (body) => ({
        url: apiRoutes.photos,
        method: "POST",
        body,
      }),
    }),
    deletePhoto: builder.mutation<any, number>({
      query: (id) => ({
        url: `${apiRoutes.photos}?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchTreeQuery,
  useCreateFamilyMemberMutation,
  useUpdateFamilyMemberMutation,
  useCreatePartnerMutation,
  useRemoveMemberMutation,
  useUpdatePartnerMutation,
  useUploadPhotoMutation,
  useDeletePhotoMutation,
} = treeApiSlice;
