'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

export function initializeFirebase() {
  if (typeof window === 'undefined') {
    return {
      firebaseApp: null,
      auth: null,
      firestore: null
    };
  }

  if (!getApps().length) {
    let firebaseApp;
    try {
      if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('placeholder')) {
        throw new Error('Invalid Firebase Config');
      }
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      console.warn('Firebase initialization failed. Falling back to dummy config for build.', e);
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
