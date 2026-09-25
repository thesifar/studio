'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { toast } from '@/hooks/use-toast';

/**
 * Reports permission failures without taking down the entire application.
 * Individual data hooks keep the underlying error available to their caller.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = () => {
      toast({
        title: 'Unable to access this content',
        description: 'Please sign in or try again in a moment.',
        variant: 'destructive',
      });
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
