'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

/**
 * A silent listener that catches FirestorePermissionErrors and re-throws them.
 * In development, this allows Next.js to display the rich contextual error overlay.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // Re-throw the error so it can be caught by the global error boundary/overlay
      // Do not use console.error here as it's handled by the environment.
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => errorEmitter.off('permission-error', handlePermissionError);
  }, []);

  return null;
}
