
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
  // Check if we have a valid configuration to prevent SDK errors
  // We're extra careful with key formats to avoid "invalid-api-key" crashes
  const isValidKey = (val?: string) => 
    !!val && 
    val.length > 10 && 
    !val.includes('YOUR_') && 
    val !== 'undefined' && 
    val !== 'null' &&
    val !== '';
  
  const hasConfig = isValidKey(firebaseConfig.apiKey) && isValidKey(firebaseConfig.projectId);
  
  if (!hasConfig) {
    console.warn("Firebase configuration is missing or incomplete. Some features like submissions may be disabled.");
    return { app: null, firestore: null, auth: null };
  }

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return { app: null, firestore: null, auth: null };
  }
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
