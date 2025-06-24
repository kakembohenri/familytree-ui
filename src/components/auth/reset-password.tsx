"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import HandleErrors from "@/src/lib/handle-errors";
import { useIsPasswordResetTokenValidMutation } from "@/src/redux/auth/auth-apiSlice";

import { IVerifyEmailSchema } from "@/src/validations/auth-validations";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { ResetPasswordForm } from "./reset-password-form";

interface ResetPasswordProps {
  token: string | null;
  email: string | null;
}

const ResetPassword: FC<ResetPasswordProps> = ({ token, email }) => {
  const [verificationState, setVerificationState] = useState<
    "verifying" | "verified" | "redirecting" | "error"
  >("verifying");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const handleOperation = async () => {
      await handleVerifyEmail({ code: token ?? "", email: email ?? "" });
    };
    handleOperation();
  }, [token, email, verificationState]);

  const [isPasswordResetValid] = useIsPasswordResetTokenValidMutation();

  const handleVerifyEmail = async (values: IVerifyEmailSchema) => {
    try {
      const response = await isPasswordResetValid(values);

      HandleErrors(response);

      let { data } = response;

      toast.success("Token validity", {
        description: data.message,
      });

      setShowForm(data.data);
    } catch (err: any) {
      console.log(err);

      toast.error("Email Verification", { description: err.message });

      setVerificationState("error");
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-50 border-b mb-4 bg-secondary text">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">Blood line</span>
          </div>
        </div>
      </header>
      {showForm ? (
        <ResetPasswordForm code={token ?? ""} email={email ?? ""} />
      ) : (
        <div className="flex min-h-[500px] items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Verfying token</CardTitle>
              <CardDescription>
                {verificationState === "verifying" &&
                  "We're verifying your token"}
                {verificationState === "verified" &&
                  "Your toekn has been verified successfully!"}
                {verificationState === "error" && "Token validation failed!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                {verificationState === "verifying" && (
                  <div className="rounded-full bg-blue-50 p-3">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                  </div>
                )}
                {verificationState === "verified" && (
                  <div className="rounded-full bg-green-50 p-3">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                )}
                {verificationState === "error" && (
                  <div className="rounded-full bg-red-50 p-3">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {verificationState === "verified" && (
                <span className="text-2xl font-bold text-primary">
                  Redirecting...
                </span>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
