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
      // Direct initialization. The studio provides valid production config.
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      console.warn('Firebase initialization failed. Falling back to dummy config for build.', e);
      // Return a dummy initialization to prevent high-level crashes during build
      firebaseApp = initializeApp({
        apiKey: "AIzaSy_placeholder_key_for_build",
        authDomain: "placeholder.firebaseapp.com",
        projectId: "placeholder-project",
        appId: "1:123456789:web:placeholder"
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