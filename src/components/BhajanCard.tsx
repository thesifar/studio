"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Mic2, Music2, MonitorPlay, Heart } from "lucide-react";
import { Bhajan } from "@/lib/mock-data";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface BhajanCardProps {
  bhajan: Bhajan;
}

export function BhajanCard({ bhajan }: BhajanCardProps) {
  return (
    <Card className="group overflow-hidden border-none bg-white/50 backdrop-blur-sm shadow-xl shadow-black/[0.03] transition-all duration-700 hover:shadow-primary/20 hover:-translate-y-3 rounded-[2.5rem]">
      <Link href={`/bhajans/${bhajan.id}`}>
        <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem]">
          <Image
            src={bhajan.thumbnail}
            alt={bhajan.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            data-ai-hint="spiritual image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
             <div className="bg-primary text-primary-foreground p-5 rounded-full shadow-2xl shadow-primary/50 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                <Play className="h-8 w-8 fill-current" />
             </div>
          </div>
          
          <div className="absolute top-5 right-5 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-all duration-500">
             <Button size="icon" variant="secondary" className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-accent hover:text-white transition-all shadow-lg">
                <Heart className="h-4 w-4" />
             </Button>
          </div>
          
          <div className="absolute bottom-5 left-5">
            <Badge variant="secondary" className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] py-1 px-3 rounded-xl font-bold flex items-center gap-2">
              {bhajan.type === 'video' ? <MonitorPlay className="h-3 w-3" /> : <Music2 className="h-3 w-3" />}
              {bhajan.duration}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-8">
        <div className="mb-3">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{bhajan.category}</span>
        </div>
        <Link href={`/bhajans/${bhajan.id}`}>
          <h3 className="font-headline font-bold text-2xl text-foreground line-clamp-1 group-hover:text-primary transition-colors leading-tight mb-2">
            {bhajan.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground font-medium mb-6">
          <Mic2 className="mr-2 h-4 w-4 text-primary/60" />
          <span className="line-clamp-1">{bhajan.artist}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {bhajan.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="bg-secondary/50 text-[10px] py-0.5 px-3 font-bold text-muted-foreground/80 border-transparent rounded-lg uppercase tracking-wider">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
