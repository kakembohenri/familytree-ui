/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { setCookie } from "@/src/lib/handle-jwt";
import { useLoginMutation } from "@/src/redux/auth/auth-apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ILoginSchema, LoginSchema } from "../validations/auth-validations";
import { frontendPaths } from "../paths/frontendPaths";

const useSignInApiService = ({
  setSubmittingMsg,
}: {
  setSubmittingMsg: Dispatch<SetStateAction<string>>;
}) => {
  const [handleLogin] = useLoginMutation();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  // const handleLogin = async (values: ILoginSchema) => {
  const submitLogin = async (values: ILoginSchema) => {
    try {
      setSubmittingMsg("Signing in...");
      setIsLoading(true);
      const response: any = await handleLogin(values);

      if (response.error) {
        throw new Error("Invalid credentials");
      }

      const { data } = response;

      //   toast(message: data.message, variant: "success" );
      toast.success("Logged in", {
        description: data.message,
      });

      sessionStorage.setItem("jwtSession", data.data);

      await setCookie(data.data);

      setSubmittingMsg("Redirecting to dashboard");

      router.push(frontendPaths.tree);
    } catch (err: any) {
      console.log(err);
      toast.error("Login in", { description: err.message });
      setSubmittingMsg("Sign in");
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit, submitLogin, register, errors };
};

export default useSignInApiService;
