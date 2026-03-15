
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
  const isValidConfig = !!(firebaseConfig.apiKey && firebaseConfig.apiKey !== '');
  
  if (!isValidConfig) {
    console.warn("Firebase configuration is missing or incomplete. Some features may not work until .env variables are set.");
    return { app: null, firestore: null, auth: null };
  }

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return { app: null, firestore: null, auth: null };
  }
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
