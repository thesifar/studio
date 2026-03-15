"use client";

import { Navigation } from "@/components/Navigation";
import { BhajanCard } from "@/components/BhajanCard";
import { BHAJANS, CATEGORIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Heart, Music } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const featuredBhajans = BHAJANS.slice(0, 4);
  const heroImageObj = PlaceHolderImages.find(img => img.id === "temple-sunset");
  const heroImage = heroImageObj?.imageUrl;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-spiritual-gradient">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Divine Temple"
              fill
              className="object-cover brightness-50"
              priority
              data-ai-hint="temple sunset"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="container relative z-10 px-4 text-center">
            <h1 className="font-headline text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-none animate-in fade-in zoom-in-95 duration-1000">
              Experience the <span className="text-primary italic">Divine</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 font-body leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Discover a curated collection of soul-stirring audio and video bhajans. Elevate your spiritual journey with timeless melodies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 h-16 rounded-full shadow-2xl shadow-primary/40 group text-lg" asChild suppressHydrationWarning>
                <Link href="/bhajans" className="flex items-center gap-3">
                  Start Listening <Play className="h-5 w-5 fill-current" />
                </Link>
              </Button>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 h-16 rounded-full shadow-2xl shadow-primary/40 text-lg" asChild suppressHydrationWarning>
                <Link href="/bhajans?type=video">Watch Collection</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Browse by <span className="text-primary">Devotion</span>
                </h2>
                <p className="text-muted-foreground text-lg">Select a path that resonates with your heart.</p>
              </div>
              <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 px-6 h-12 rounded-full transition-all" asChild suppressHydrationWarning>
                <Link href="/bhajans" className="flex items-center gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {CATEGORIES.map((cat, i) => (
                <Link 
                  key={cat} 
                  href={`/bhajans?category=${encodeURIComponent(cat)}`}
                  className="group relative h-40 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm border border-primary/10 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 flex flex-col items-center justify-center p-4 text-center"
                >
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                     <Sparkles className="h-6 w-6" />
                   </div>
                   <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                     {cat}
                   </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-24 bg-secondary/20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">Handpicked Selections</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our most meaningful and popular devotional content.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBhajans.map((bhajan) => (
                <BhajanCard key={bhajan.id} bhajan={bhajan} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary to-accent p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-primary/20 text-center text-white">
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-8">
                  <Heart className="h-10 w-10 text-white fill-white/20" />
                </div>
                <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6 tracking-tight">Stay Connected</h2>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-body leading-relaxed">
                  Join our spiritual community and receive curated bhajan releases and wisdom directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="h-14 px-6 rounded-full border-none bg-white/20 backdrop-blur-lg text-white placeholder:text-white/60 w-full focus:ring-2 focus:ring-white/40 focus:outline-none transition-all"
                    suppressHydrationWarning
                  />
                  <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-10 h-14 text-lg font-bold" suppressHydrationWarning>
                     Join Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white/50 py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tight text-primary">Bhajan Sangam</span>
              </div>
              <p className="text-muted-foreground text-lg max-sm mb-8 italic">
                Preserving eternal culture through spiritual music.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6 text-foreground uppercase tracking-widest">Library</h4>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li><Link href="/bhajans" className="hover:text-primary transition-colors">All Bhajans</Link></li>
                <li><Link href="/bhajans?type=video" className="hover:text-primary transition-colors">Video Collection</Link></li>
                <li><Link href="/bhajans?type=audio" className="hover:text-primary transition-colors">Audio Library</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6 text-foreground uppercase tracking-widest">Support</h4>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin Portal</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground font-medium">
            <p>© 2024 Bhajan Sangam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
