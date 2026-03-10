
"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Mic2, Music2, MonitorPlay, Plus } from "lucide-react";
import { Bhajan } from "@/lib/mock-data";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { usePlaylist } from "@/context/PlaylistContext";
import { toast } from "@/hooks/use-toast";

interface BhajanCardProps {
  bhajan: Bhajan;
}

export function BhajanCard({ bhajan }: BhajanCardProps) {
  const { addToQueue } = usePlaylist();
  
  // Robust fallback for empty thumbnails to prevent Next.js Image error
  const thumbnailUrl = bhajan.thumbnail || "https://picsum.photos/seed/fallback/800/450";

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQueue(bhajan);
    toast({
      title: "Added to Queue",
      description: `${bhajan.title} added to your spiritual journey.`,
    });
  };

  return (
    <Card className="group overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 rounded-3xl">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={bhajan.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <Button size="icon" className="h-14 w-14 rounded-full bg-primary/90 hover:bg-primary shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300" asChild>
             <Link href={`/bhajans/${bhajan.id}`}>
               <Play className="h-6 w-6 fill-white text-white" />
             </Link>
           </Button>
        </div>
        
        <div className="absolute top-4 right-4">
           <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-md border-none text-primary hover:bg-primary hover:text-white transition-all" onClick={handleAddToQueue}>
              <Plus className="h-5 w-5" />
           </Button>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-none text-primary py-1 px-3 rounded-full font-bold flex items-center gap-2">
            {bhajan.type === 'video' ? <MonitorPlay className="h-3.5 w-3.5" /> : <Music2 className="h-3.5 w-3.5" />}
            {bhajan.duration}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{bhajan.category}</span>
        </div>
        <Link href={`/bhajans/${bhajan.id}`}>
          <h3 className="font-headline font-bold text-xl text-foreground line-clamp-1 hover:text-primary transition-colors mb-1">
            {bhajan.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground font-medium">
          <Mic2 className="mr-2 h-4 w-4 text-primary/60" />
          <span className="truncate">{bhajan.artist}</span>
        </div>
      </CardContent>
    </Card>
  );
}
