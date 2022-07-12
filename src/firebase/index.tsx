import { createContext, useContext, useMemo } from "react";
import { initializeApp } from "firebase/app";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import type { Analytics } from "firebase/analytics";

/* responsible for actually creating the firebase instance */
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBBgm73ewEz6S4cFpvSTyPKYF_GnVqFj5I",
  authDomain: "web-comments-generator.firebaseapp.com",
  projectId: "web-comments-generator",
  storageBucket: "web-comments-generator.appspot.com",
  messagingSenderId: "666553344072",
  appId: "1:666553344072:web:5e0c713bd31dfd2d8df87d",
  measurementId: "G-P14V81WVG8",
};

class Firebase {
  app: FirebaseApp;
  analytics?: Analytics;
  db: Firestore;

  constructor(firebaseConfig: FirebaseOptions) {
    this.app = initializeApp(firebaseConfig);
    // this.analytics = getAnalytics(this.app);
    this.db = getFirestore(this.app);
  }
}

const FirebaseContext = createContext<Firebase | undefined>(undefined);

export function useFirebase() {
  const firebase = useContext(FirebaseContext);
  if (!firebase) {
    throw new Error("useFirebase used outside FirebaseContext.Provider");
  }

  return firebase;
}

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export default function FirebaseProvider({ children }: FirebaseProviderProps) {
  const app = useMemo(() => {
    return new Firebase(firebaseConfig);
  }, [firebaseConfig]);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
}
