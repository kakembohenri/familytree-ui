"use client";

import useUserService from "@/src/apiServices/useUserService";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  selectedUser,
  setUserDialog,
  showUserDialog,
} from "@/src/redux/user/user-slice";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface AddUserProps {
  refetch: () => void;
}

export function AddUser({ refetch }: AddUserProps) {
  const [submittingMsg, setSubmittingMsg] = useState<string>("Add User");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const user = useAppSelector(selectedUser);
  const {
    isLoading,
    handleSubmit,
    handleUser,
    register,
    errors,
    watch,
    setValue,
  } = useUserService({ refetch, setSubmittingMsg });

  // Add husband id
  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("middleName", user.middleName ?? "");
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("gender", user.gender);
      setSubmittingMsg("Update User");
    }
  }, [user]);

  const dispatch = useAppDispatch();

  const open = useAppSelector(showUserDialog);

  const onOpenChange = (show: boolean) => {
    dispatch(setUserDialog({ show: show, user: null }));
  };

  const gender = watch("gender");

  const handleGenderChange = (option: string) => {
    setValue("gender", option as "Male" | "Female");
  };

  const changePassword = watch("isPasswordChanged");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{user ? "Update User" : "Add User"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 py-4" onSubmit={handleSubmit(handleUser)}>
          {Object.entries(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>Errors</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.entries(errors).map(([key, value], index) => (
                    <li key={index}>
                      {key}: {value.message}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-3 gap-4">
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
              <Label htmlFor="middleName">Middle name</Label>
              <Input
                id="middleName"
                {...register("middleName")}
                placeholder="Enter middle name...."
              />
              {errors.middleName && (
                <p className="text-sm" style={{ color: "red" }}>
                  {errors.middleName.message}
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
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-sm" style={{ color: "red" }}>
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={handleGenderChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          {user && (
            <>
              <div className="flex space-y-2 gap-2">
                <Label htmlFor="terms-2">Change password</Label>
                <Checkbox
                  id="terms-2"
                  onCheckedChange={(checked) =>
                    setValue("isPasswordChanged", checked === true)
                  }
                />
              </div>
              {changePassword && (
                <div className="space-y-2">
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
                  <div className="space-y-4">
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
                </div>
              )}
            </>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button type="submit" disabled={isLoading}>
              {submittingMsg}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
