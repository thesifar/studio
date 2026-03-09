"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Search, Home, LogIn, Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

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

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 px-4 pt-4",
      isScrolled ? "h-20" : "h-24"
    )}>
      <div className={cn(
        "container mx-auto h-full flex items-center justify-between px-6 rounded-3xl transition-all duration-500",
        isScrolled 
          ? "glass-effect shadow-lg shadow-black/5" 
          : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className={cn(
              "font-headline font-bold text-2xl tracking-tight transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              Bhajan Sangam
            </span>
          </Link>
          <nav className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-2 text-sm font-bold tracking-wide transition-all group flex items-center gap-2",
                  pathname === item.href 
                    ? (isScrolled ? "text-primary" : "text-white") 
                    : (isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/70 hover:text-white")
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-transform origin-left",
                  pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center relative group">
             <Search className={cn(
               "absolute left-3.5 h-4 w-4 transition-colors",
               isScrolled ? "text-muted-foreground" : "text-white/60"
             )} />
             <input
               type="search"
               placeholder="Search..."
               className={cn(
                 "h-11 w-48 rounded-2xl border bg-transparent pl-11 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
                 isScrolled 
                   ? "border-input bg-secondary/50 focus:bg-white focus:w-64" 
                   : "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:bg-white/20 focus:w-64 backdrop-blur-sm"
               )}
             />
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className={cn(
                "hidden sm:flex items-center gap-2 rounded-2xl font-bold transition-all h-11 px-5",
                isScrolled 
                  ? "text-muted-foreground hover:text-primary hover:bg-primary/5" 
                  : "text-white hover:bg-white/10"
              )}
            >
              <Link href="/admin/login">
                <LogIn className="h-4 w-4" />
                <span>Portal</span>
              </Link>
            </Button>
            
            <Button 
              className={cn(
                "rounded-2xl font-bold px-8 h-11 shadow-lg transition-all",
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:shadow-primary/30" 
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              Explore
            </Button>
            
            <Button variant="ghost" size="icon" className={cn(
              "md:hidden rounded-2xl",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
