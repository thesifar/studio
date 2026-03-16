
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      // Validate API key to prevent SDK crash
      // We check for common placeholder strings rather than valid API key prefixes
      const isValidKey = firebaseConfig.apiKey && 
                        firebaseConfig.apiKey !== "" && 
                        !firebaseConfig.apiKey.includes("YOUR_API_KEY") &&
                        !firebaseConfig.apiKey.includes("REPLACE_ME");

      if (process.env.NODE_ENV === "production" && !isValidKey) {
        throw new Error("Missing valid Firebase API Key");
      }

      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Initialization failed.', e);
      }
      // Return a dummy initialization to prevent high-level crashes
      firebaseApp = initializeApp({
        apiKey: "placeholder-key",
        authDomain: "placeholder-domain",
        projectId: "placeholder-project",
        appId: "placeholder-app"
      });
    }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
