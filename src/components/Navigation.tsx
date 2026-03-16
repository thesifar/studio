
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Search, Home, LogOut, User, Settings, UploadCloud, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { PlaylistQueue } from "./PlaylistQueue";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading: userLoading } = useUser();
  const auth = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Collection", href: "/bhajans", icon: Music },
  ];

  const isHome = pathname === "/";

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 px-4 py-3",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b shadow-sm" : "bg-transparent"
      )}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
            aria-label="Bhajan Sangam Home"
          >
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform" aria-hidden="true">
              <Music className="h-6 w-6 text-white" />
            </div>
            <span className={cn(
              "font-headline font-bold text-2xl tracking-tight transition-colors",
              isScrolled ? "text-foreground" : (isHome ? "text-white" : "text-foreground")
            )}>
              Bhajan Sangam
            </span>
          </Link>
          <nav className="hidden md:flex gap-6" role="navigation" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm font-bold tracking-wide transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1",
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
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className={cn(
              "hidden sm:flex rounded-full gap-2 font-bold",
              !isScrolled && isHome ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : ""
            )}
            aria-label="Submit a new bhajan for approval"
            suppressHydrationWarning
          >
            <Link href="/submit">
              <UploadCloud className="h-4 w-4" aria-hidden="true" />
              <span>Submit Bhajan</span>
            </Link>
          </Button>

          <div className="hidden lg:flex items-center relative">
             <Search className="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
             <input
               type="search"
               placeholder="Find a bhajan..."
               aria-label="Search bhajans"
               className="h-10 w-40 xl:w-48 rounded-full border border-primary/20 bg-background/50 pl-10 pr-4 text-sm focus:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
               suppressHydrationWarning
             />
          </div>
          
          <PlaylistQueue />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-auto rounded-full p-1 gap-2 border border-primary/10 bg-secondary/20"
                  suppressHydrationWarning
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground", !isScrolled && isHome && "text-white/70")} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "Spiritual Seeker"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/dashboard" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className={cn(
              "rounded-full font-bold",
              !isScrolled && isHome ? "text-white hover:bg-white/10" : "text-primary"
            )} suppressHydrationWarning>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
