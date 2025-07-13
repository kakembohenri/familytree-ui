/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSignUpMutation } from "@/src/redux/auth/auth-apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import HandleErrors from "../lib/handle-errors";
import { ISignupSchema, SignupSchema } from "../validations/auth-validations";
import { apiRoutes } from "../paths/apiRoutes";

const useSignUpApiService = ({
  setSubmittingMsg,
}: {
  setSubmittingMsg: Dispatch<SetStateAction<string>>;
}) => {
  const [handleSignUp, { isSuccess }] = useSignUpMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignupSchema>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      family: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(SignupSchema),
  });

  // const handleLogin = async (values: ILoginSchema) => {
  const submitSignUp = async (values: ISignupSchema) => {
    try {
      setIsLoading(true);
      const response: any = await handleSignUp(values);

      HandleErrors(response);

      const { data } = response;

      setSubmittingMsg(data.message);

      // For prod where azure cant send emails using my preferred method
      // if (data.data !== null) {
      //   const formData: any = data.data;
      //   await fetch(apiRoutes.auth.send_email, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       to: formData.to,
      //       subject: formData.subject,
      //       htmlContent: formData.htmlContent,
      //     }),
      //   });
      // }

      reset();
    } catch (err: any) {
      console.log(err);
      setSubmittingMsg(err.message);
      setIsLoading(false);
    } finally {
      setIsDone(true);
    }
  };

  return {
    isLoading,
    handleSubmit,
    submitSignUp,
    register,
    errors,
    isSuccess,
    isDone,
  };
};

export default useSignUpApiService;
