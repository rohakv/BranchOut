import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={signIn}>Login</button>;
  } else {
    return (
      <>
        <p>{JSON.stringify(session)}</p>
        <button onClick={signOut}>Signout</button>
      </>
    );
  }

  return (
    <>
      <p>Loading</p>
    </>
  );
};

export default Login;
