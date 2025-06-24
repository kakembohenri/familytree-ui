/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useChangePasswordMutation } from "@/src/redux/auth/auth-apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HandleErrors from "../lib/handle-errors";
import {
  ChangePasswordSchema,
  IChangePasswordSchema,
} from "../validations/auth-validations";

const useChangePasswordService = ({
  setSubmittingMsg,
}: {
  setSubmittingMsg: Dispatch<SetStateAction<string>>;
}) => {
  const [handleChangePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IChangePasswordSchema>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });

  const submitChangePassword = async (values: IChangePasswordSchema) => {
    try {
      setSubmittingMsg("Submitting....");
      const response: any = await handleChangePassword(values);

      HandleErrors(response);

      const { data } = response;

      toast.success("Change Password", {
        description: data.message,
      });

      setSubmittingMsg("Change Password");

      reset();
    } catch (err: any) {
      console.log(err);
      toast.success("Change Password", {
        description: err.message,
      });
      setSubmittingMsg(err.message);
    }
  };

  return {
    isLoading,
    handleSubmit,
    submitChangePassword,
    register,
    errors,
    setValue,
  };
};

export default useChangePasswordService;
