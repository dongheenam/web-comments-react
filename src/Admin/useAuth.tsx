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

type UseAuth = [User | undefined, () => void, () => void];

export default function useAuth(): UseAuth {
  const [user, setUser] = useState<User>();

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, [auth]);

  return [user, signIn, signOut];
}
