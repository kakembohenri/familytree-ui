"use client";

import { ReactNode, useRef } from "react";
import store from "@/src/redux/store";
import { Provider } from "react-redux";
import type { Store } from "@reduxjs/toolkit"; // or your own Store type

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<Store | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
