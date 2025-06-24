"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ForgotPasswordForm } from "./forgot-password-form";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";

export function AuthContainer() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Tabs
      defaultValue="login"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
        <TabsTrigger value="forgot">Reset Password</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="space-y-4 pt-4">
        <LoginForm setActiveTab={setActiveTab} />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm onLoginClick={() => setActiveTab("login")} />
      </TabsContent>
      <TabsContent value="forgot">
        <ForgotPasswordForm onLoginClick={() => setActiveTab("login")} />
      </TabsContent>
    </Tabs>
  );
}
