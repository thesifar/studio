"use client";

import { Navigation } from "@/components/Navigation";
import { BhajanCard } from "@/components/BhajanCard";
import { BHAJANS, CATEGORIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Heart, Star, Music } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredBhajans = BHAJANS.slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === "temple-sunset")?.imageUrl || "";

  return (
    <div className="flex flex-col min-h-screen bg-pattern">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Divine Temple"
            fill
            className="object-cover brightness-[0.3] scale-105"
            priority
            data-ai-hint="indian temple"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="container relative z-10 px-4 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">Spiritual Sanctuary</span>
            </div>
            
            <h1 className="font-headline text-7xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-none animate-in fade-in zoom-in-95 duration-1000">
              Bhajan <span className="text-primary italic">Sangam</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-body leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Experience the profound depth of Indian spiritual music. A curated collection of timeless melodies to guide your inner journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 h-16 rounded-2xl shadow-2xl shadow-primary/40 group text-lg" asChild>
                <Link href="/bhajans" className="flex items-center gap-3">
                  Listen Now <Play className="h-5 w-5 fill-current" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 font-bold px-12 h-16 rounded-2xl text-lg" asChild>
                <Link href="/bhajans?type=video">Watch Videos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-12 bg-primary rounded-full" />
                  <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Curated Selection</span>
                </div>
                <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Handpicked for <span className="text-gradient">Peace</span>
                </h2>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary/10 hover:bg-primary/5 font-bold px-6 h-12 rounded-xl transition-all" asChild>
                <Link href="/bhajans" className="flex items-center gap-2">
                  View Full Library <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredBhajans.map((bhajan) => (
                <BhajanCard key={bhajan.id} bhajan={bhajan} />
              ))}
            </div>
          </div>
        </section>

        {/* Path/Categories Section */}
        <section className="py-32 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground mb-6">Explore the Divine</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light italic">
                "Where words fail, music speaks. Where music speaks, the soul awakens."
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {CATEGORIES.map((cat, i) => (
                <Link 
                  key={cat} 
                  href={`/bhajans?category=${encodeURIComponent(cat)}`}
                  className="group relative overflow-hidden h-56 rounded-[2.5rem] border border-primary/10 bg-white/50 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-primary/10 hover:-translate-y-2 hover:bg-white"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <Sparkles className="h-7 w-7" />
                      </div>
                      <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {cat}
                      </span>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-40 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-primary to-accent p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:32px_32px]" />
              <div className="relative z-10 text-center text-white">
                <div className="inline-flex p-5 rounded-3xl bg-white/10 backdrop-blur-md mb-10 transform -rotate-6">
                  <Heart className="h-12 w-12 text-white fill-white/20" />
                </div>
                <h2 className="font-headline text-5xl md:text-7xl font-bold mb-8 tracking-tight">Stay Connected</h2>
                <p className="text-xl md:text-2xl text-white/80 mb-14 leading-relaxed max-w-3xl mx-auto">
                  Receive curated spiritual updates, new bhajan releases, and soul-awakening wisdom directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="h-16 px-8 rounded-2xl border-none bg-white/20 backdrop-blur-lg text-white placeholder:text-white/60 w-full focus:ring-4 focus:ring-white/20 focus:outline-none transition-all shadow-inner text-lg"
                  />
                  <Button size="lg" className="rounded-2xl bg-white text-primary hover:bg-white/90 px-12 h-16 text-xl font-bold shadow-xl">
                     Join Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card py-24 border-t border-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/30">
                  <Music className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="font-headline font-bold text-3xl tracking-tight text-primary">Bhajan Sangam</span>
              </div>
              <p className="text-muted-foreground text-xl max-w-md mb-10 font-light italic">
                Preserving the eternal light of Vedic culture through the universal language of spiritual music.
              </p>
              <div className="flex gap-5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 text-foreground tracking-wide uppercase">Discover</h4>
              <ul className="space-y-5 text-muted-foreground text-lg">
                <li><Link href="/bhajans" className="hover:text-primary transition-colors">All Bhajans</Link></li>
                <li><Link href="/bhajans?type=video" className="hover:text-primary transition-colors">Video Collection</Link></li>
                <li><Link href="/bhajans?type=audio" className="hover:text-primary transition-colors">Audio Library</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">New Releases</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 text-foreground tracking-wide uppercase">Company</h4>
              <ul className="space-y-5 text-muted-foreground text-lg">
                <li><Link href="#" className="hover:text-primary transition-colors">Our Vision</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/admin/login" className="hover:text-primary transition-colors font-semibold text-primary/80">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p className="font-medium">© 2024 Bhajan Sangam. All rights reserved.</p>
            <div className="flex gap-10">
              <Link href="#" className="hover:text-primary transition-all">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-all">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
