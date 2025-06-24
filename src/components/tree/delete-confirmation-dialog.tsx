/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  setConfirmDeletePerson,
  showDeleteDialog,
} from "@/src/redux/tree/tree-slice";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { FamilyNode } from "@/src/types/family-member";
import { useRemoveMemberMutation } from "@/src/redux/tree/tree-api-slice";
import HandleErrors from "@/src/lib/handle-errors";
import { toast } from "sonner";

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  person: FamilyNode | null;
  refetch: () => void;
}

export function DeleteConfirmationDialog({
  title,
  description,
  person,
  refetch,
}: DeleteConfirmationDialogProps) {
  const dispatch = useAppDispatch();

  const open = useAppSelector(showDeleteDialog);

  const [removeMember, { isLoading }] = useRemoveMemberMutation();

  const onOpenChange = (show: boolean) => {
    dispatch(setConfirmDeletePerson({ show: show, person: null }));
  };

  const onConfirm = async () => {
    try {
      const response: any = await removeMember(person?.id ?? 0);

      HandleErrors(response);

      const { data } = response;

      toast.success("Remove member", {
        description: data.message,
      });

      refetch();
      dispatch(setConfirmDeletePerson({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Remove member", {
        description: "Failed!",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? "Deleting user..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
