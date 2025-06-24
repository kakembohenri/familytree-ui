import Sidebar from "@/src/components/layout/sidebar";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Family Tree",
  description: "Manage your family tree and genealogy",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
