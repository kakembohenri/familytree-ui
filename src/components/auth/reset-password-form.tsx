"use client";

import usePasswordResetService from "@/src/apiServices/usePasswordResetService";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardTitle } from "../ui/card";

interface ResetPasswordFormProps {
  code: string;
  email: string;
}

export function ResetPasswordForm({ code, email }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [submittingMsg, setSubmittingMsg] = useState<string>("Reset Password");

  const {
    isLoading,
    handleSubmit,
    submitPasswordReset,
    register,
    errors,
    setValue,
  } = usePasswordResetService({ setSubmittingMsg });

  useEffect(() => {
    if (email !== "" && code !== "") {
      setValue("email", email);
      setValue("code", code);
    }
  }, [email, code]);

  return (
    <div className="flex justify-center">
      <Card className="w-[32rem]">
        <div className="space-y-4 pt-4 rounded-2xl">
          <CardTitle>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Reset Password</h3>
            </div>
          </CardTitle>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(submitPasswordReset)}
            >
              <div className="space-y-2">
                <Label htmlFor="password-signup">New Password</Label>
                <Input
                  id="password-signup"
                  type="password"
                  {...register("password")}
                  placeholder="Enter new password..."
                />
                {errors.password && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    {...register("passwordConfirmation")}
                    placeholder="Confirm password..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.passwordConfirmation && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {submittingMsg}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
