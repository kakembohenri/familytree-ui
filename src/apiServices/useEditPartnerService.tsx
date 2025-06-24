/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HandleErrors from "../lib/handle-errors";
import { useAppDispatch } from "../redux/redux-hooks";
import { useUpdatePartnerMutation } from "../redux/tree/tree-api-slice";
import { setEditPartnership } from "../redux/tree/tree-slice";
import {
  EditPartnershipSchema,
  IEditPartnershipSchema,
} from "../validations/partner-validation";

const useEditPartnershipService = ({ refetch }: { refetch: () => void }) => {
  const [handleEditPartnership, { isLoading }] = useUpdatePartnerMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IEditPartnershipSchema>({
    defaultValues: {
      id: 0,
      married: "",
      divorced: null,
    },
    resolver: zodResolver(EditPartnershipSchema),
  });

  const submitPartner = async (values: IEditPartnershipSchema) => {
    try {
      const response: any = await handleEditPartnership(values);

      HandleErrors(response);

      const { data } = response;

      toast.success("Edit partner", {
        description: data.message,
      });

      refetch();
      dispatch(setEditPartnership({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Edit partner", {
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

export default useEditPartnershipService;
