"use client";

import { useAppDispatch } from "@/src/redux/redux-hooks";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { toast } from "sonner";
import { clearCookie } from "../lib/handle-jwt";
import { frontendPaths } from "../paths/frontendPaths";

const useLogoutService = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      sessionStorage.removeItem("jwtSession");

      await clearCookie();

      toast.success("Logout successfull", {
        description: "Redirecting to home page",
      });

      router.push(frontendPaths.home);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
};

export default useLogoutService;
