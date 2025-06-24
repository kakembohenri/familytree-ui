import { ThemeProvider } from "@/src/components/theme-provider";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Blood line",
  description: "Manage your family tree and genealogy",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />

          <NextTopLoader />
          <div className="flex h-screen">
            {/* <Sidebar /> */}
            <div className="flex-1 overflow-auto">
              <StoreProvider>{children}</StoreProvider>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
