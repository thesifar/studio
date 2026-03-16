
"use client";

import { usePlaylist } from "@/context/PlaylistContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListMusic, Trash2, Play, X, Music, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function PlaylistQueue() {
  const { queue, removeFromQueue, clearQueue } = usePlaylist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="relative gap-2 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 border-none h-10 px-5"
          aria-label={`View playlist queue, ${queue.length} items`}
          suppressHydrationWarning
        >
          <ListMusic className="h-5 w-5" aria-hidden="true" />
          <span className="hidden md:inline">Queue</span>
          {queue.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-primary font-black shadow-sm border border-primary/10">
              {queue.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        className="w-full sm:max-w-md flex flex-col p-0" 
        role="dialog" 
        aria-label="Spiritual Queue"
      >
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-headline text-2xl font-bold flex items-center gap-2">
              <ListMusic className="text-primary" aria-hidden="true" /> My Queue
            </SheetTitle>
            {queue.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearQueue} 
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                aria-label="Clear all items from queue"
                suppressHydrationWarning
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {queue.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
                <Music className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium">Your queue is empty</p>
              <p className="text-xs">Add some divine bhajans to start your journey.</p>
            </div>
          ) : (
            <div className="space-y-3" role="list" aria-label="Items in your queue">
              {queue.map((bhajan) => (
                <div 
                  key={bhajan.id} 
                  role="listitem"
                  className="group relative flex items-center gap-3 p-2 rounded-xl bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-background transition-all"
                >
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={bhajan.thumbnail} alt="" fill className="object-cover" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{bhajan.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{bhajan.artist}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full" 
                      asChild
                      aria-label={`Go to ${bhajan.title}`}
                      suppressHydrationWarning
                    >
                      <Link href={`/bhajans/${bhajan.id}`}>
                        <Play className="h-4 w-4 text-primary fill-primary" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10" 
                      onClick={() => removeFromQueue(bhajan.id)}
                      aria-label={`Remove ${bhajan.title} from queue`}
                      suppressHydrationWarning
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
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
