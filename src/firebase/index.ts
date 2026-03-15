'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

/**
 * Initializes Firebase services safely.
 * Returns null for services if the configuration is missing or invalid.
 */
export function initializeFirebase(): { app: FirebaseApp | null; firestore: Firestore | null; auth: Auth | null } {
  // Robust check for placeholder or invalid configuration
  const isValidValue = (val?: string) => 
    !!val && 
    val.length > 10 && 
    !val.includes('YOUR_') && 
    val !== 'undefined' && 
    val !== 'null' &&
    val !== '';
  
  const hasRequiredConfig = isValidValue(firebaseConfig.apiKey) && isValidValue(firebaseConfig.projectId);
  
  if (!hasRequiredConfig) {
    // Return nulls to avoid SDK crash with bad credentials
    return { app: null, firestore: null, auth: null };
  }

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (error) {
    // Silently handle initialization errors in this context
    return { app: null, firestore: null, auth: null };
  }
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
