"use client";

import useChangePasswordService from "@/src/apiServices/useChangePasswordService";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ChangePassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [submittingMsg, setSubmittingMsg] = useState<string>("Change Password");

  const { isLoading, handleSubmit, submitChangePassword, register, errors } =
    useChangePasswordService({ setSubmittingMsg });

  return (
    <div className="flex justify-center">
      <Card className="w-[32rem]">
        <div className="space-y-4 pt-4 rounded-2xl">
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(submitChangePassword)}
            >
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  type="password"
                  {...register("oldPassword")}
                  placeholder="Enter old password..."
                />
                {errors.oldPassword && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  type="password"
                  {...register("newPassword")}
                  placeholder="Enter new password..."
                />
                {errors.newPassword && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmNewPassword")}
                    placeholder="Confirm new password..."
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
                {errors.confirmNewPassword && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.confirmNewPassword.message}
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
