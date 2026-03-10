"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Music4, PlusCircle, LogOut, Settings, BarChart3, Home, Tags, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Manage Bhajans", href: "/admin/bhajans", icon: Music4 },
    { label: "Submissions", href: "/admin/submissions", icon: Inbox, badge: "3" },
    { label: "Manage Categories", href: "/admin/categories", icon: Tags },
    { label: "Add New Bhajan", href: "/admin/bhajans/new", icon: PlusCircle },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Music4 className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-lg text-primary">BS Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-6 rounded-xl transition-all relative",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && pathname !== item.href && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-muted-foreground hover:text-destructive px-4">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span>Public Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-muted-foreground hover:text-destructive px-4">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
