"use client";

import useEditPartnershipService from "@/src/apiServices/useEditPartnerService";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  selectedPerson,
  setEditPartnership,
  showEditPartnership,
} from "@/src/redux/tree/tree-slice";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Partner } from "@/src/types/family-member";

interface EditPartnershipDialogProps {
  refetch: () => void;
}

export function EditPartnershipDialog({ refetch }: EditPartnershipDialogProps) {
  const person = useAppSelector(selectedPerson);
  const { isLoading, handleSubmit, submitPartner, register, errors, setValue } =
    useEditPartnershipService({ refetch });

  //   useUpdatePartnerMutation
  // Add familyId
  useEffect(() => {
    if (person) {
      setValue("id", (person as Partner).partnerId);
      setValue("married", (person as Partner).married);
      setValue("divorced", (person as Partner).divorced ?? "");
    }
  }, [person]);

  const dispatch = useAppDispatch();

  const open = useAppSelector(showEditPartnership);

  const onOpenChange = (show: boolean) => {
    dispatch(setEditPartnership({ show: show, person: null }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit partnership</DialogTitle>
        </DialogHeader>

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
        <form
          onSubmit={handleSubmit(submitPartner)}
          className="flex flex-col gap-2"
        >
          <div className="space-y-2">
            <Label htmlFor="married">Married</Label>
            <Input type="date" id="married" {...register("married")} />
            {errors.married && (
              <p className="text-sm" style={{ color: "red" }}>
                {errors.married.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="divorced">Divvorced</Label>
            <Input type="date" id="divorced" {...register("divorced")} />
            {errors.divorced && (
              <p className="text-sm" style={{ color: "red" }}>
                {errors.divorced.message}
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Partnership"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
