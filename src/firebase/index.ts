'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Initializes Firebase services on the client side.
 * This function is idempotent and ensures only one instance exists.
 */
export function initializeFirebase() {
  // Prevent SSR execution as Firebase Client SDK requires a browser environment
  if (typeof window === 'undefined') {
    return {
      firebaseApp: null,
      auth: null,
      firestore: null
    };
  }

  // Check if an app has already been initialized
  if (!getApps().length) {
    // Direct initialization using the config provided in src/firebase/config.ts
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }

  // Return the existing initialized app
  return getSdks(getApp());
}

/**
 * Helper to retrieve specific Firebase service instances.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

// Barrel exports for Firebase functionality
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
