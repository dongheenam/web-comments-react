import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FirebaseProvider } from "./firebase";

export default function Comments() {
  return (
    <Suspense fallback={<span>Loading database...</span>}>
      <FirebaseProvider>
        <Outlet />
      </FirebaseProvider>
    </Suspense>
  );
}
