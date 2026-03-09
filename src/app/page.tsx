
"use client";

import { Navigation } from "@/components/Navigation";
import { BhajanCard } from "@/components/BhajanCard";
import { BHAJANS, CATEGORIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredBhajans = BHAJANS.slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === "temple-sunset")?.imageUrl || "";

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Divine Temple"
            fill
            className="object-cover brightness-[0.4]"
            priority
            data-ai-hint="indian temple"
          />
          <div className="container relative z-10 px-4 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Bhajan Sangam
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-body font-light">
              Experience the divine through the purest collection of devotional music. 
              Find peace, solace, and spiritual awakening.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 rounded-full" asChild>
                <Link href="/bhajans">Explore All Bhajans</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white/20 font-semibold px-8 h-12 rounded-full" asChild>
                <Link href="/bhajans?type=video">Watch Videos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                  Featured Bhajans
                </h2>
                <p className="text-muted-foreground mt-2">Curated selection of our most loved spiritual hymns.</p>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary/80 font-semibold" asChild>
                <Link href="/bhajans" className="flex items-center gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBhajans.map((bhajan) => (
                <BhajanCard key={bhajan.id} bhajan={bhajan} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-primary text-center mb-12">
              Browse by Deity & Theme
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map((cat, i) => (
                <Link 
                  key={cat} 
                  href={`/bhajans?category=${encodeURIComponent(cat)}`}
                  className="group relative overflow-hidden h-32 rounded-xl border border-primary/10 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
                >
                   <div className="absolute inset-0 bg-white group-hover:bg-primary/5 transition-colors" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <span className="font-headline text-lg font-bold text-primary/80 group-hover:text-primary transition-colors text-center">
                        {cat}
                      </span>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-headline text-4xl font-bold text-primary mb-6">Start Your Spiritual Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Whether you are looking for peaceful meditation music or energetic kirtans, 
              Bhajan Sangam has something for every heart.
            </p>
            <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 px-10 h-14 text-lg">
               Join Our Community
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
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
                </svg>
              </div>
          </div>
          <p className="text-muted-foreground font-headline text-xl mb-4">Bhajan Sangam</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
            Spreading the light of devotion through soulful music.
          </p>
          <div className="flex justify-center gap-6 mb-8 text-muted-foreground">
             <Link href="#" className="hover:text-primary transition-colors">About</Link>
             <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Bhajan Sangam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
