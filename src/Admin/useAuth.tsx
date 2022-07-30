import { useEffect, useState } from "react";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { useFirebase } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

type UseAuth = [User | undefined, boolean | undefined, () => void, () => void];

export default function useAuth(): UseAuth {
  const [user, setUser] = useState<User>();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const functions = getFunctions(useFirebase().app, "australia-southeast1");

  const app = useFirebase().app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  setPersistence(auth, browserSessionPersistence);

  function signIn(): void {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function signOut(): void {
    if (auth.currentUser) {
      auth.signOut();
    }
  }

  async function checkAdmin() {
    const isUserAdmin = httpsCallable(functions, "isUserAdmin");
    const response = (await isUserAdmin()) as { data: { admin: boolean } };
    return response.data.admin;
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAdmin(undefined);
        checkAdmin().then((value) => setIsAdmin(value));
      } else {
        setUser(undefined);
      }
    });
  }, [auth]);

  return [user, isAdmin, signIn, signOut];
}
