import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { getBranchOutServerSession } from "~/server/auth";
import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

const Home: NextPage = () => {

  const { data: session, status } = useSession()
  
  return (
    <>
      <h1>Hello {JSON.stringify(session.user)}</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    
    const session = await getBranchOutServerSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        session,
      },
    }
}

export default Home;
