/* eslint-disable @react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/src/components/ui/button";
import { formatToHumanReadableDate } from "@/src/lib/handle-dates";
import { selectUser } from "@/src/redux/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { setUserDialog } from "@/src/redux/user/user-slice";
import { User } from "@/src/types/user";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const name = `${row.original?.firstName} ${row.original?.middleName} ${row.original?.lastName}`;
      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return <p>{gender}</p>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <p>{role}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <p>{email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return <p>{phone}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return <p>{createdAt && formatToHumanReadableDate(createdAt)}</p>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const dispatch = useAppDispatch();
      const handleUser = () => {
        dispatch(setUserDialog({ user, show: true }));
      };
      const userObj: any = useAppSelector(selectUser);
      return (
        <>
          <Button variant="outline" size="icon" onClick={handleUser}>
            <Eye />
          </Button>
          {userObj?.Id !== user?.id && (
            <Button variant="outline" size="icon" onClick={handleUser}>
              <Edit />
            </Button>
          )}
        </>
      );
    },
  },
];
