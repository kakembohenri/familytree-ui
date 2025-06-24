"use client";

import useUpdateFamilyMemberService from "@/src/apiServices/useUpdateFamilyMemberService";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  selectedPerson,
  setEditPerson,
  showEditDialog,
} from "@/src/redux/tree/tree-slice";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import BasicInfo from "./basic-info";
import Details from "./details";

interface UpdateFamilyMemberDialogProps {
  refetch: () => void;
}

export function UpdateFamilyMemberDialog({
  refetch,
}: UpdateFamilyMemberDialogProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const person = useAppSelector(selectedPerson);
  const {
    isLoading,
    handleSubmit,
    submitMember,
    register,
    errors,
    watch,
    setValue,
  } = useUpdateFamilyMemberService({ refetch });

  useEffect(() => {
    if (person) {
      setValue("id", person.id);
      setValue("email", person.email);
      setValue("firstName", person.firstName);
      setValue("lastName", person.lastName);
      setValue("middleName", person.middleName);
      setValue("bio", person.bio);
      setValue("born", person.born);
      setValue("died", person.died);
      setValue("phone", person.phone);
      setValue("gender", person.gender as "Male" | "Female");
      setValue("placeOfBirth", person.placeOfBirth);
      setValue("occupation", person.occupation);
    }
  }, [person]);

  const dispatch = useAppDispatch();

  const open = useAppSelector(showEditDialog);

  const onOpenChange = (show: boolean) => {
    dispatch(setEditPerson({ show: show, person: null }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Family Member</DialogTitle>
          <DialogDescription>
            Update information about the family member to add them to your tree.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitMember)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Additional Details</TabsTrigger>
              <TabsTrigger value="contact">Contacts</TabsTrigger>
            </TabsList>
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

            <TabsContent value="basic" className="space-y-4 py-4">
              <BasicInfo
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                person={person!}
                refetch={refetch}
              />
              <div className="pt-2 flex justify-end">
                <Button type="button" onClick={() => setActiveTab("details")}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 py-4">
              <Details register={register} errors={errors} />

              <div className="pt-2 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("basic")}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("contact")}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 py-4">
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("details")}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Update Family Member"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
