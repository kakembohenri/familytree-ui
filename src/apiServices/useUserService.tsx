/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import HandleErrors from "../lib/handle-errors";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../redux/user/user-api-slice";
import { IUserSchema, UserSchema } from "../validations/user-validation";
import { useAppDispatch } from "../redux/redux-hooks";
import { setUserDialog } from "../redux/user/user-slice";
import { toast } from "sonner";

const useUserService = ({
  setSubmittingMsg,
  refetch,
}: {
  setSubmittingMsg: Dispatch<SetStateAction<string>>;
  refetch: () => void;
}) => {
  const [handleCreateUser, { isLoading: submittingNewUser }] =
    useCreateUserMutation();

  const [handleEditUser, { isLoading: updatingUser }] = useUpdateUserMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IUserSchema>({
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phone: "",
      gender: "",
      isPasswordChanged: false,
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(UserSchema),
  });

  const handleUser = async (values: IUserSchema) => {
    try {
      setSubmittingMsg("Submitting ...");
      const response: any =
        values.id !== 0
          ? await handleEditUser(values)
          : await handleCreateUser(values);

      HandleErrors(response);

      setSubmittingMsg(values.id !== 0 ? "Update user" : "Create user");
      toast.success(values.id ? "Update user" : "Add user", {
        description: values.id
          ? "User successfully added!"
          : "User successfully updated!",
      });

      reset();
      refetch();
      dispatch(setUserDialog({ user: null, show: false }));
    } catch (err: any) {
      console.log(err);
      toast.success("Add user", {
        description: "User addition failed!",
      });
      setSubmittingMsg(err.message);
    }
  };

  return {
    isLoading: submittingNewUser || updatingUser,
    handleSubmit,
    handleUser,
    register,
    errors,
    watch,
    setValue,
  };
};

export default useUserService;
