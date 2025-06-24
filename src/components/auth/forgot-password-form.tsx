"use client";

import HandleErrors from "@/src/lib/handle-errors";
import { setCookie } from "@/src/lib/handle-jwt";
import { usePasswordResetRequestMutation } from "@/src/redux/auth/auth-apiSlice";
import {
  IRequestPasswordResetSchema,
  RequestPasswordResetSchema,
} from "@/src/validations/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ForgotPasswordFormProps {
  onLoginClick?: () => void;
}

export function ForgotPasswordForm({ onLoginClick }: ForgotPasswordFormProps) {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [submittingMsg, setSubmittingMsg] = useState<string>("");

  const [handlePasswordResetRequest, { isLoading, isSuccess }] =
    usePasswordResetRequestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestPasswordResetSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(RequestPasswordResetSchema),
  });

  const submitRequest = async (values: IRequestPasswordResetSchema) => {
    try {
      const response: any = await handlePasswordResetRequest(values.email);

      HandleErrors(response);

      const { data } = response;

      //   toast(message: data.message, variant: "success" );
      toast.success("Logged in", {
        description: data.message,
      });

      sessionStorage.setItem("jwtSession", data.data);

      await setCookie(data.data);

      setSubmittingMsg(data.message);
    } catch (err: any) {
      console.log(err);
      toast.error("Login in", { description: err.message });
      setSubmittingMsg(err.message);
    } finally {
      setIsDone(true);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      {isDone && (
        <Alert
          variant={isSuccess ? "default" : "destructive"}
          style={{ background: "lightgreen" }}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <AlertTitle>Password reset request</AlertTitle>
          <AlertDescription>{submittingMsg}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold">Reset Your Password</h3>
        <p className="text-sm text-gray-500">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(submitRequest)}>
        <div className="space-y-2">
          <Label htmlFor="email-reset">Email</Label>
          <Input
            id="email-reset"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Sending request..." : "Send Reset Link"}
        </Button>
      </form>
      {isLoading && (
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Button
            variant="link"
            className="p-0 text-green-600"
            onClick={onLoginClick}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
}
