
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, PlayCircle, Search, Home, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Browse", href: "/bhajans", icon: Music },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary-foreground"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                <path d="M19 14a5 5 0 0 1-5 5" />
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="m4.9 4.9 2.9 2.9" />
                <path d="m16.2 16.2 2.9 2.9" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="m4.9 19.1 2.9-2.9" />
                <path d="m16.2 7.8 2.9-2.9" />
              </svg>
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">
              Bhajan Sangam
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center relative">
             <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
             <input
               type="search"
               placeholder="Search bhajans..."
               className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
             />
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
