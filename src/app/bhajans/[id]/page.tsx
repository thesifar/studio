
"use client";

import { useParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { BHAJANS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BhajanCard } from "@/components/BhajanCard";
import { ChevronLeft, Share2, Heart, Music, Play, Mic2, Calendar, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BhajanDetailPage() {
  const { id } = useParams();
  const bhajan = BHAJANS.find(b => b.id === id);
  const relatedBhajans = BHAJANS.filter(b => b.id !== id).slice(0, 3);

  if (!bhajan) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bhajan Not Found</h1>
            <Button asChild><Link href="/bhajans">Back to Collection</Link></Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
           <Button variant="ghost" size="sm" asChild className="mb-4 text-muted-foreground hover:text-primary">
             <Link href="/bhajans" className="flex items-center gap-1">
               <ChevronLeft className="h-4 w-4" />
               Back to Browse
             </Link>
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Player Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl overflow-hidden bg-black aspect-video relative shadow-2xl ring-1 ring-primary/10">
              {bhajan.type === 'video' ? (
                <video 
                  src={bhajan.url} 
                  controls 
                  poster={bhajan.thumbnail}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/20 to-primary/5">
                   <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-xl ring-4 ring-primary/30">
                     <Image src={bhajan.thumbnail} alt={bhajan.title} fill className="object-cover" />
                     <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                   </div>
                   <audio src={bhajan.url} controls className="w-4/5 max-w-lg mb-4" />
                   <p className="text-white/60 text-sm animate-bounce flex items-center gap-2">
                     <Music className="h-4 w-4" /> Now Playing...
                   </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">{bhajan.title}</h1>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mic2 className="h-4 w-4 text-primary/70" />
                      <span>{bhajan.artist}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4 text-primary/70" />
                      <span>{bhajan.language}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full"><Heart className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3">{bhajan.category}</Badge>
                {bhajan.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
              </div>

              <div className="prose prose-stone dark:prose-invert max-w-none pt-4">
                <h3 className="text-lg font-semibold mb-2">About this Bhajan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {bhajan.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar / Related */}
          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-headline text-xl font-bold mb-4 text-primary">Bhajan Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Added On</span>
                   <span className="font-medium">{new Date(bhajan.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-muted-foreground flex items-center gap-2"><Music className="h-4 w-4" /> Format</span>
                   <span className="font-medium capitalize">{bhajan.type}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                   <span className="text-muted-foreground flex items-center gap-2"><Play className="h-4 w-4" /> Duration</span>
                   <span className="font-medium">{bhajan.duration}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold mb-4 text-primary">You Might Also Like</h3>
              <div className="space-y-6">
                {relatedBhajans.map(item => (
                  <BhajanCard key={item.id} bhajan={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
