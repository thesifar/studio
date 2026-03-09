"use client";

import { Navigation } from "@/components/Navigation";
import { BhajanCard } from "@/components/BhajanCard";
import { BHAJANS, CATEGORIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredBhajans = BHAJANS.slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === "temple-sunset")?.imageUrl || "";

  return (
    <div className="flex flex-col min-h-screen bg-pattern">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Divine Temple"
            fill
            className="object-cover brightness-[0.35]"
            priority
            data-ai-hint="indian temple"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          <div className="container relative z-10 px-4 text-center">
            <Badge variant="outline" className="mb-6 bg-white/5 backdrop-blur-sm text-primary-foreground border-white/20 px-4 py-1.5 rounded-full animate-fade-in">
              <Sparkles className="h-3 w-3 mr-2 text-primary" />
              Your Sanctuary for Soulful Devotion
            </Badge>
            <h1 className="font-headline text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
              Bhajan Sangam
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
              Immerse yourself in a curated ocean of spiritual serenity. 
              Pure melodies to heal the heart and awaken the soul.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-14 rounded-2xl shadow-xl shadow-primary/20 group" asChild>
                <Link href="/bhajans" className="flex items-center gap-2">
                  Start Listening <Play className="h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white/15 font-bold px-10 h-14 rounded-2xl transition-all" asChild>
                <Link href="/bhajans?type=video">Watch Divine Videos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-24 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 bg-primary" />
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">Recommended</span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                  Today's Featured <span className="text-primary italic">Vibes</span>
                </h2>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary/10 font-bold px-0 hover:px-4 transition-all" asChild>
                <Link href="/bhajans" className="flex items-center gap-2">
                  Browse All Collections <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBhajans.map((bhajan) => (
                <BhajanCard key={bhajan.id} bhajan={bhajan} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-secondary/20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
                Find Your Path
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Explore devotion through different deities and spiritual themes curated for your journey.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CATEGORIES.map((cat, i) => (
                <Link 
                  key={cat} 
                  href={`/bhajans?category=${encodeURIComponent(cat)}`}
                  className="group relative overflow-hidden h-44 rounded-3xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-colors" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-headline text-xl font-bold text-foreground group-hover:text-primary transition-colors text-center leading-tight">
                        {cat}
                      </span>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent/10 mb-8 transform rotate-12">
              <Heart className="h-10 w-10 text-accent fill-accent/20" />
            </div>
            <h2 className="font-headline text-5xl font-bold text-foreground mb-6">Join the Circle of Devotion</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Stay connected with new releases, spiritual insights, and community events. 
              Let the divine melody stay in your heart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="h-14 px-6 rounded-2xl border border-input bg-white w-full sm:w-80 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
              />
              <Button size="lg" className="rounded-2xl bg-accent hover:bg-accent/90 px-10 h-14 text-lg font-bold shadow-lg shadow-accent/20">
                 Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                  <Music className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tight text-primary">Bhajan Sangam</span>
              </div>
              <p className="text-muted-foreground text-lg max-w-md mb-8">
                Spreading the timeless light of devotion through soulful music and divine visual storytelling.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                    <Sparkles className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-foreground">Explore</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/bhajans" className="hover:text-primary transition-colors">All Bhajans</Link></li>
                <li><Link href="/bhajans?type=video" className="hover:text-primary transition-colors">Video Collection</Link></li>
                <li><Link href="/bhajans?type=audio" className="hover:text-primary transition-colors">Audio Library</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">New Releases</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-foreground">Community</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Bhajan Sangam. Crafted with devotion.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";
