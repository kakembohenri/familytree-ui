"use client";

import useLogoutService from "@/src/apiServices/useLogoutService";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { frontendPaths } from "@/src/paths/frontendPaths";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Lock,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import JWTDecodeContainer from "../auth/jwt-decode-container";
import { useAppSelector } from "@/src/redux/redux-hooks";
import { selectUser } from "@/src/redux/auth/auth-slice";
import { UserRoles } from "@/src/enums/userRoles";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const user = useAppSelector(selectUser);

  const navItems = [
    { href: frontendPaths.tree, label: "Family Tree", icon: Home },
    { href: frontendPaths.users, label: "Admin Users", icon: UserCog },
    { href: frontendPaths.settings, label: "Settings", icon: Settings },
    {
      href: frontendPaths.change_password,
      label: "Change Password",
      icon: Lock,
    },
  ];

  const { isLoading, handleLogout } = useLogoutService();

  return (
    <div
      className={cn(
        "h-screen bg-muted/40 border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <JWTDecodeContainer />

      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && <h1 className="font-semibold text-xl">Family Tree</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            if (
              (user as any)?.Role !== UserRoles.ADMIN &&
              item.href === frontendPaths.users
            ) {
              return null; // Skip admin users link for non-admins
            }
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-muted",
                      collapsed ? "px-2" : "px-4"
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t mt-auto">
        <Button
          variant="ghost"
          className={cn("w-full justify-start", collapsed ? "px-2" : "px-4")}
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{isLoading ? "Logging out..." : "Logout"}</span>}
        </Button>
      </div>
    </div>
  );
}
