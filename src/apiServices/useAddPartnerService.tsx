/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HandleErrors from "../lib/handle-errors";
import { useAppDispatch } from "../redux/redux-hooks";
import { useCreatePartnerMutation } from "../redux/tree/tree-api-slice";
import { setAddPartner } from "../redux/tree/tree-slice";
import {
  AddPartnerSchema,
  IAddPartnerSchema,
} from "../validations/partner-validation";

const useAddPartnerService = ({ refetch }: { refetch: () => void }) => {
  const [handleAddPartner, { isLoading }] = useCreatePartnerMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IAddPartnerSchema>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      bio: "",
      born: "",
      died: null,
      phone: "",
      gender: "Male",
      husbandId: 0,
      married: "",
      divorced: null,
      placeOfBirth: "",
      occupation: "",
    },
    resolver: zodResolver(AddPartnerSchema),
  });

  const submitPartner = async (values: IAddPartnerSchema) => {
    try {
      const response: any = await handleAddPartner(values);

      HandleErrors(response);

      const { data } = response;

      toast.success("Add partner", {
        description: data.message,
      });

      refetch();
      dispatch(setAddPartner({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Add partner", {
        description: "Failed!",
      });
    }
  };

  return {
    isLoading,
    handleSubmit,
    submitPartner,
    register,
    errors,
    watch,
    setValue,
  };
};

export default useAddPartnerService;
