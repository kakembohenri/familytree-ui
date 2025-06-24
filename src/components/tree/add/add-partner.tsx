"use client";

import useAddPartnerService from "@/src/apiServices/useAddPartnerService";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  selectedPerson,
  setAddPartner,
  showAddPartner,
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
import { Textarea } from "../../ui/textarea";
import BasicInfoPartner from "./basic-info-partners";

interface AddPartnerProps {
  refetch: () => void;
}

export function AddPartner({ refetch }: AddPartnerProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const person = useAppSelector(selectedPerson);
  const {
    isLoading,
    handleSubmit,
    submitPartner,
    register,
    errors,
    watch,
    setValue,
  } = useAddPartnerService({ refetch });

  // Add husband id
  useEffect(() => {
    if (person) {
      setValue("husbandId", person.id);
    }
  }, [person]);

  const dispatch = useAppDispatch();

  const open = useAppSelector(showAddPartner);

  const onOpenChange = (show: boolean) => {
    dispatch(setAddPartner({ show: show, person: null }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Partner</DialogTitle>
          <DialogDescription>
            Enter information about the partner to add them to your tree.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitPartner)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="marriage">Marriage Details</TabsTrigger>
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
              <BasicInfoPartner
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
              <div className="pt-2 flex justify-end">
                <Button type="button" onClick={() => setActiveTab("marriage")}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="marriage" className="space-y-4 py-4">
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
                <Label htmlFor="divorced">Divorced</Label>
                <Input type="date" id="divorced" {...register("divorced")} />
                {errors.divorced && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.divorced.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="button" onClick={() => setActiveTab("details")}>
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4 py-4">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Birth Place</Label>
                  <Input id="birthPlace" {...register("placeOfBirth")} />
                  {errors.placeOfBirth && (
                    <p className="text-sm" style={{ color: "red" }}>
                      {errors.placeOfBirth.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" {...register("occupation")} />
                  {errors.occupation && (
                    <p className="text-sm" style={{ color: "red" }}>
                      {errors.occupation.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea id="bio" {...register("bio")} rows={4} />
                  {errors.bio && (
                    <p className="text-sm" style={{ color: "red" }}>
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </div>

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
                  {isLoading ? "Submitting..." : "Add Family Member"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
