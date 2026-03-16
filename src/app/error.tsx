'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-spiritual-gradient flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-primary/10 max-w-lg w-full">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="font-headline text-3xl font-bold text-primary mb-4">Divine Interruption</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The sanctuary is experiencing a momentary disturbance. This might be due to a connectivity issue or a temporary restriction.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-left overflow-auto max-h-40">
            <p className="text-xs font-mono text-red-600 break-all">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()} 
            className="rounded-full h-14 font-bold text-lg shadow-lg shadow-primary/20"
          >
            <RefreshCcw className="h-5 w-5 mr-2" /> Try Again
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="text-primary font-bold"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}