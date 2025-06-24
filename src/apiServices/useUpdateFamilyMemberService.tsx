/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HandleErrors from "../lib/handle-errors";
import { useAppDispatch } from "../redux/redux-hooks";
import { useUpdateFamilyMemberMutation } from "../redux/tree/tree-api-slice";
import { setEditPerson } from "../redux/tree/tree-slice";
import {
  IUpdateMemberSchema,
  UpdateMemberSchema,
} from "../validations/family-member-validation";

const useUpdateFamilyMemberService = ({ refetch }: { refetch: () => void }) => {
  const [handleUpdateMember, { isLoading }] = useUpdateFamilyMemberMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IUpdateMemberSchema>({
    defaultValues: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      bio: "",
      born: "",
      died: null,
      phone: "",
      gender: "Male",
      fatherId: null,
      motherId: null,
      placeOfBirth: "",
      occupation: "",
    },
    resolver: zodResolver(UpdateMemberSchema),
  });

  const submitMember = async (values: IUpdateMemberSchema) => {
    try {
      const response: any = await handleUpdateMember(values);

      HandleErrors(response);

      const { data } = response;

      toast.success("Update family member", {
        description: data.message,
      });

      refetch();
      reset();
      dispatch(setEditPerson({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Update family member", {
        description: "Failed!",
      });
    }
  };

  return {
    isLoading,
    handleSubmit,
    submitMember,
    register,
    errors,
    watch,
    setValue,
  };
};

export default useUpdateFamilyMemberService;
