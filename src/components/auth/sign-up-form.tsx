"use client";

import useSignUpApiService from "@/src/apiServices/useSignUpApiService";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SignUpFormProps {
  onLoginClick?: () => void;
}

export function SignUpForm({ onLoginClick }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [submittingMsg, setSubmittingMsg] = useState<string>("");

  const {
    isLoading,
    handleSubmit,
    submitSignUp,
    register,
    errors,
    isSuccess,
    isDone,
  } = useSignUpApiService({ setSubmittingMsg });

  return isDone ? (
    <div className="space-y-4 pt-4">
      <Alert
        variant={isSuccess ? "default" : "destructive"}
        style={{ background: "lightgreen" }}
      >
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Sign up</AlertTitle>
        <AlertDescription>{submittingMsg}</AlertDescription>
      </Alert>
    </div>
  ) : (
    <div className="space-y-4 pt-4">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold">Create an Account</h3>
        <p className="text-sm text-gray-500">
          Enter your information to get started
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(submitSignUp)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              {...register("firstName")}
              placeholder="Enter first name...."
            />
            {errors.firstName && (
              <p className="text-sm" style={{ color: "red" }}>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              {...register("lastName")}
              placeholder="Enter last name...."
            />
            {errors.lastName && (
              <p className="text-sm" style={{ color: "red" }}>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="family">Family Name</Label>
          <Input
            id="family"
            placeholder="Enter your family name...."
            {...register("family")}
          />
          {errors.family && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.family.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-signup">Email</Label>
          <Input
            id="email-signup"
            type="email"
            placeholder="Enter your valid email address...."
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password-signup">Password</Label>
          <Input
            id="password-signup"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              {...register("passwordConfirmation")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
      {!isLoading && (
        <div className="text-center text-sm">
          Already have an account?{" "}
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
