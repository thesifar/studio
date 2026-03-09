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
    <Card className="group overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 bg-white rounded-3xl">
      <Link href={`/bhajans/${bhajan.id}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={bhajan.thumbnail}
            alt={bhajan.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="spiritual image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
             <div className="bg-primary text-primary-foreground p-4 rounded-full scale-90 group-hover:scale-100 transition-all duration-500 shadow-xl shadow-primary/40">
                <Play className="h-6 w-6 fill-current" />
             </div>
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
             <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:text-accent">
                <Heart className="h-3.5 w-3.5" />
             </Button>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-[10px] py-0.5 px-2 h-6 rounded-lg font-bold shadow-sm flex items-center gap-1.5">
              {bhajan.type === 'video' ? <MonitorPlay className="h-3 w-3 text-orange-600" /> : <Music2 className="h-3 w-3 text-blue-600" />}
              {bhajan.duration}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{bhajan.category}</span>
        </div>
        <Link href={`/bhajans/${bhajan.id}`}>
          <h3 className="font-headline font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors leading-tight">
            {bhajan.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center text-sm text-muted-foreground font-medium">
          <Mic2 className="mr-1.5 h-3.5 w-3.5 text-primary/60" />
          <span className="line-clamp-1">{bhajan.artist}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {bhajan.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="bg-secondary/50 text-[10px] py-0 px-2.5 font-semibold text-muted-foreground border-transparent rounded-lg">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
