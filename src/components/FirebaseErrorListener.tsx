'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Listens for globally emitted 'permission-error' events.
 * Throws them as uncaught exceptions to trigger the development overlay
 * with full security rule context for debugging.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // Setting the error in state to trigger a re-render and throw
      setError(error);
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  // Throwing during render ensures the error is caught by Next.js error boundaries
  // and surfaced correctly in the UI for the agentive debugging loop.
  if (error) {
    throw error;
  }

  return null;
}