"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useSignInApiService from "@/src/apiServices/useLoginApiService";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  setActiveTab: Dispatch<SetStateAction<string>>;
}
export function LoginForm({ setActiveTab }: LoginFormProps) {
  const [submittingMsg, setSubmittingMsg] = useState<string>("Sign in");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { isLoading, submitLogin, handleSubmit, register, errors } =
    useSignInApiService({ setSubmittingMsg });

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold">Welcome Back</h3>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(submitLogin)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button
              variant="link"
              className="p-0 text-xs text-green-600"
              onClick={() => setActiveTab("forgot")}
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            {/* <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /> */}
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              required
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
          {errors.password && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.password.message}
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
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Button
          variant="link"
          className="p-0 text-green-600"
          onClick={() => setActiveTab("signup")}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
