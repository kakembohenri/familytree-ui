"use client";

import { clearCookie, getCookie, getDecryptedJWT } from "@/src/lib/handle-jwt";
import { frontendPaths } from "@/src/paths/frontendPaths";
import { setUser } from "@/src/redux/auth/auth-slice";
import { useAppDispatch } from "@/src/redux/redux-hooks";

import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

const JWTDecodeContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const evaluateToken = async () => {
      if (typeof window !== "undefined") {
        const jwtSession = sessionStorage.getItem("jwtSession");
        if (jwtSession) {
          const decryptedJwt: any = await getDecryptedJWT(jwtSession);
          const cookieJWT = await getCookie();
          if (decryptedJwt && cookieJWT) {
            const user = JSON.parse(decryptedJwt.userProfile);
            dispatch(setUser(user));
          } else {
            // Clear cookie and jwt session if they are invalid
            dispatch(setUser(undefined));
            await clearCookie();
            router.push(frontendPaths.home);
          }
        } else {
          dispatch(setUser(undefined));
        }
      }
    };

    evaluateToken();
  }, []);

  return <></>;
};

export default JWTDecodeContainer;
