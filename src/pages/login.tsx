import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";


const Login: NextPage = () => {
  return (
    <>
      <button onClick={signIn}>Login</button><br />
      <button onClick={signOut}>Signout</button>
    </>
  )
}

export default Login;