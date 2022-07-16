import Button from "../components/Button";
import Explanation from "../components/Explanation";
import CheckCount from "./CheckCount";
import UploadComment from "./UploadComment";
import useAuth from "./useAuth";

export default function Admin() {
  const [user, signIn, signOut] = useAuth();
  return (
    <>
      <h2>Admin</h2>
      {user ? (
        <>
          <p>
            Note: you can only send the request if you are registered as an
            admin account.
          </p>
          <CheckCount />
          <UploadComment />
          <h2>Sign out</h2>
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
