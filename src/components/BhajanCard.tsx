
"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Mic2, Clock, Music2, MonitorPlay } from "lucide-react";
import { Bhajan } from "@/lib/mock-data";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";

interface BhajanCardProps {
  bhajan: Bhajan;
}

export function BhajanCard({ bhajan }: BhajanCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-sm transition-all hover:shadow-md bg-card">
      <Link href={`/bhajans/${bhajan.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={bhajan.thumbnail}
            alt={bhajan.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="spiritual image"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
             <div className="bg-primary text-primary-foreground p-3 rounded-full scale-90 group-hover:scale-100 transition-transform">
                <Play className="h-6 w-6 fill-current" />
             </div>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs py-0 px-1.5 h-5">
              {bhajan.type === 'video' ? <MonitorPlay className="h-3 w-3 mr-1" /> : <Music2 className="h-3 w-3 mr-1" />}
              {bhajan.duration}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/bhajans/${bhajan.id}`}>
          <h3 className="font-headline font-bold text-lg text-primary line-clamp-1 group-hover:underline">
            {bhajan.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-center text-sm text-muted-foreground">
          <Mic2 className="mr-1 h-3 w-3" />
          <span className="line-clamp-1">{bhajan.artist}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {bhajan.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-[10px] py-0 px-2 font-normal text-muted-foreground border-muted">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
