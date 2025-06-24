/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { setCookie } from "@/src/lib/handle-jwt";
import { useResetPasswordMutation } from "@/src/redux/auth/auth-apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HandleErrors from "../lib/handle-errors";
import {
  IPasswordResetSchema,
  PasswordResetSchema,
} from "../validations/auth-validations";
import { useRouter } from "nextjs-toploader/app";
import { frontendPaths } from "../paths/frontendPaths";

const usePasswordResetService = ({
  setSubmittingMsg,
}: {
  setSubmittingMsg: Dispatch<SetStateAction<string>>;
}) => {
  const [handlePasswordReset] = useResetPasswordMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IPasswordResetSchema>({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(PasswordResetSchema),
  });

  // const handleLogin = async (values: ILoginSchema) => {
  const submitPasswordReset = async (values: IPasswordResetSchema) => {
    try {
      setIsLoading(true);
      setSubmittingMsg("Submitting....");
      const response: any = await handlePasswordReset(values);

      HandleErrors(response);

      const { data } = response;

      sessionStorage.setItem("jwtSession", data.data);

      await setCookie(data.data);

      toast.success("Password Reset", {
        description: data.message,
      });

      setSubmittingMsg("Authenticating....");

      router.push(frontendPaths.tree);
      reset();
    } catch (err: any) {
      console.log(err);
      toast.success("Password Reset", {
        description: err.message,
      });
      setSubmittingMsg(err.message);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    submitPasswordReset,
    register,
    errors,
    setValue,
  };
};

export default usePasswordResetService;
