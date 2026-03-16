'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Listens for globally emitted 'permission-error' events.
 * Logs them to console for the LLM to see, but avoids crashing the UI.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error('Firebase Permission Denied Context:', error.message);
      setError(error);
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  // We log the error but render nothing. 
  // In a production app, you might show a small toast here.
  return null;
}