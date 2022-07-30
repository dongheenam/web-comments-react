import useAuth from "./useAuth";
import { Button } from "../components";
import CheckCount from "./CheckCount";
import EditDatabase from "./EditDatabase";

export default function Admin() {
  const [user, isAdmin, signIn, signOut] = useAuth();
  return (
    <>
      <h1>Admin Tools</h1>
      {user ? (
        <>
          <p>
            <span>
              Current user: {user.email}
              <br />
            </span>
            {isAdmin === undefined ? (
              <span>Checking login status...</span>
            ) : isAdmin === true ? (
              <span>You are logged in as an admin account.</span>
            ) : (
              <span>You are not an admin!</span>
            )}
          </p>
          <Button color="red" variant="outline" onClick={() => signOut()}>
            Sign out
          </Button>
          <section>
            <CheckCount />
          </section>
          <section>
            <EditDatabase />
          </section>
        </>
      ) : (
        <div>
          <div className="mb-8">Please login first!</div>
          <Button variant="outline" onClick={() => signIn()}>
            Sign in with Google
          </Button>
        </div>
      )}
    </>
  );
}
