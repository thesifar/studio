
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase(): { app: FirebaseApp; firestore: Firestore; auth: Auth } {
  // Check if configuration is valid before initializing
  const isValidConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== '';
  
  if (!isValidConfig) {
    console.warn("Firebase configuration is missing. The app may not function correctly until .env variables are set.");
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  return { app, firestore, auth };
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
