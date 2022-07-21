import useAuth from "./useAuth";
import Button from "../components/Button";
import Explanation from "../components/Explanation";
import CheckCount from "./CheckCount";
import EditDatabase from "./EditDatabase";

export default function Admin() {
  const [user, signIn, signOut] = useAuth();
  return (
    <>
      <h2>Admin Tools</h2>
      {user ? (
        <>
          <p>
            Note: you can only send the request if you are registered as an
            admin account.
          </p>
          <CheckCount />
          <EditDatabase />
          <h3>Sign out</h3>
          <Button color="red" variant="outline" onClick={() => signOut()}>
            Sign out
          </Button>
          <Explanation className="overflow-hidden break-all mt-4">
            Current user: {JSON.stringify({ email: user.email, uid: user.uid })}
          </Explanation>
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
