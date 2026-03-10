"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Search, Home, Menu, Sparkles, UserCircle, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { PlaylistQueue } from "./PlaylistQueue";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Collection", href: "/bhajans", icon: Music },
  ];

  const isHome = pathname === "/";

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 px-4 py-3",
      isScrolled ? "bg-background/80 backdrop-blur-lg border-b shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Music className="h-6 w-6 text-white" />
            </div>
            <span className={cn(
              "font-headline font-bold text-2xl tracking-tight transition-colors",
              isScrolled ? "text-foreground" : (isHome ? "text-white" : "text-foreground")
            )}>
              Bhajan Sangam
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-bold tracking-wide transition-colors hover:text-primary",
                    isScrolled 
                      ? (isActive ? "text-primary" : "text-muted-foreground")
                      : (isHome ? "text-white" : (isActive ? "text-primary" : "text-muted-foreground"))
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className={cn(
            "hidden sm:flex rounded-full gap-2 font-bold",
            !isScrolled && isHome ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : ""
          )}>
            <Link href="/submit">
              <UploadCloud className="h-4 w-4" />
              <span>Submit Bhajan</span>
            </Link>
          </Button>

          <div className="hidden lg:flex items-center relative">
             <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
             <input
               type="search"
               placeholder="Find a bhajan..."
               className="h-10 w-40 xl:w-48 rounded-full border border-primary/20 bg-background/50 pl-10 pr-4 text-sm focus:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
             />
          </div>
          
          <PlaylistQueue />
          
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/admin/login">
              <UserCircle className={cn(
                "h-6 w-6",
                isScrolled ? "text-foreground" : (isHome ? "text-white" : "text-foreground")
              )} />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
