"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { formatToHumanReadableDate } from "@/src/lib/handle-dates";
import { cn } from "@/src/lib/utils";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  setEditPerson,
  setViewPerson,
  showDetailDialog,
} from "@/src/redux/tree/tree-slice";
import { FamilyNode } from "@/src/types/family-member";
import { Edit } from "lucide-react";
import { useState } from "react";
import ContactsTab from "./view/contacts-tab";
import DetailsTab from "./view/details-tab";
import PhotosTab from "./view/photos-tab";
import RelationshipTab from "./view/relationships-tab";

interface FamilyMemberDetailDialogProps {
  person: FamilyNode;
  refetch: () => void;
}
export function FamilyMemberDetailDialog({
  person,
  refetch,
}: FamilyMemberDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("details");

  const open = useAppSelector(showDetailDialog);

  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setViewPerson({ show: false, person }));
    dispatch(setEditPerson({ show: true, person }));
  };

  const onOpenChange = (show: boolean) => {
    dispatch(setViewPerson({ show: show, person: null }));
  };

  // Sample photos for demonstration
  // const photos = person.images || [
  //   "/placeholder.svg?height=400&width=600",
  //   "/placeholder.svg?height=600&width=400",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=400&width=600",
  // ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl">
            {person.firstName} {person.middleName} {person.lastName}{" "}
          </DialogTitle>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </DialogHeader>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6 py-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 md:h-40 md:w-40">
              <AvatarImage
                src={person.avatar?.path || "/unknown.jpg"}
                alt={person.firstName}
              />
              <AvatarFallback className="text-2xl">
                {person.firstName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">
                {person.firstName} {person.middleName} {person.lastName}
              </h3>
              <div>
                {person.born && (
                  <p className="text-muted-foreground">
                    {`b. ${formatToHumanReadableDate(person.born)}`}
                  </p>
                )}
                {person.died && (
                  <p className="text-muted-foreground">
                    {person.died &&
                      ` - d. ${formatToHumanReadableDate(person.died)}`}
                  </p>
                )}
              </div>
              {person.gender && (
                <Badge
                  className={cn(
                    "mt-2",
                    person.gender === "male"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : person.gender === "female"
                      ? "bg-pink-100 text-pink-800 hover:bg-pink-100"
                      : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                  )}
                  variant="outline"
                >
                  {person.gender.charAt(0).toUpperCase() +
                    person.gender.slice(1)}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <DetailsTab person={person} />
              </TabsContent>

              <TabsContent value="contacts" className="mt-4">
                <ContactsTab person={person} />
              </TabsContent>

              <TabsContent value="relationships" className="mt-4">
                <RelationshipTab person={person} />
              </TabsContent>

              <TabsContent value="photos" className="mt-4">
                <PhotosTab person={person} refetch={refetch} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
