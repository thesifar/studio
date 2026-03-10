"use client";

import { usePlaylist } from "@/context/PlaylistContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListMusic, Trash2, Play, X, Music, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PlaylistQueue() {
  const { queue, removeFromQueue, clearQueue } = usePlaylist();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative gap-2 rounded-full border-primary/20 bg-background/50 hover:bg-primary/10 text-primary">
          <ListMusic className="h-5 w-5" />
          <span className="hidden md:inline">Queue</span>
          {queue.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
              {queue.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-headline text-2xl font-bold flex items-center gap-2">
              <ListMusic className="text-primary" /> My Queue
            </SheetTitle>
            {queue.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearQueue} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {queue.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium">Your queue is empty</p>
              <p className="text-xs">Add some divine bhajans to start your journey.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {queue.map((bhajan) => (
                <div key={bhajan.id} className="group relative flex items-center gap-3 p-2 rounded-xl bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-background transition-all">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={bhajan.thumbnail} alt={bhajan.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{bhajan.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{bhajan.artist}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                      <Link href={`/bhajans/${bhajan.id}`}>
                        <Play className="h-4 w-4 text-primary fill-primary" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromQueue(bhajan.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}