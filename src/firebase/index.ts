
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
      const isValidKey = firebaseConfig.apiKey && 
                        firebaseConfig.apiKey !== "" && 
                        !firebaseConfig.apiKey.startsWith("AIzaSyBt"); // Generic check for placeholder

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
        apiKey: "placeholder",
        authDomain: "placeholder",
        projectId: "placeholder",
        appId: "placeholder"
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
