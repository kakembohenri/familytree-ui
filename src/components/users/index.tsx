/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { useFetchUsersQuery } from "@/src/redux/user/user-api-slice";
import { setUserDialog, showUserDialog } from "@/src/redux/user/user-slice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import JWTDecodeContainer from "../auth/jwt-decode-container";
import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AddUser } from "./add-user";
import { columns } from "./columns";

const UsersView = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const { data, isFetching, refetch } = useFetchUsersQuery({
    limit: limit,
    page: page,
  });

  const showDialog = useAppSelector(showUserDialog);
  const dispatch = useAppDispatch();

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setLimit(data.limit);
      setPage(data.currentPage);
      setTotalItems(data.pages);
    }
  }, [data]);

  const onPageChange = async (setpage: number) => {
    setPage(setpage);
    try {
      refetch();
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to fetch info");
    }
  };

  const onLimitChange = async (setlimit: number) => {
    setLimit(setlimit);
    try {
      refetch();
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to fetch info");
    }
  };

  const openAddUser = () => {
    dispatch(setUserDialog({ show: true }));
  };

  return (
    <>
      <JWTDecodeContainer />
      {showDialog && <AddUser refetch={handleRefetch} />}
      <Card>
        <CardContent>
          <div className="flex justify-end">
            <Button onClick={openAddUser}>Add User</Button>
          </div>
          <div className="space-y-4">
            <DataTable
              columns={columns}
              data={data?.list ?? []}
              isLoading={isFetching}
              limit={limit}
              page={page}
              totalItems={totalItems}
              onPageChange={onPageChange}
              onLimitChange={onLimitChange}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UsersView;
