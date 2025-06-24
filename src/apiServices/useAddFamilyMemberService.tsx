/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HandleErrors from "../lib/handle-errors";
import { useCreateFamilyMemberMutation } from "../redux/tree/tree-api-slice";
import {
  AddMemberSchema,
  IAddMemberSchema,
} from "../validations/family-member-validation";
import { useAppDispatch } from "../redux/redux-hooks";
import { setShowAddMember } from "../redux/tree/tree-slice";

const useAddFamilyMemberService = ({ refetch }: { refetch: () => void }) => {
  const [handleAddMember, { isLoading }] = useCreateFamilyMemberMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IAddMemberSchema>({
    defaultValues: {
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
    resolver: zodResolver(AddMemberSchema),
  });

  const submitMember = async (values: IAddMemberSchema) => {
    try {
      const response: any = await handleAddMember(values);

      HandleErrors(response);

      const { data } = response;

      toast.success("Add family member", {
        description: data.message,
      });

      refetch();
      reset();
      dispatch(setShowAddMember({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Add family member", {
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

export default useAddFamilyMemberService;
