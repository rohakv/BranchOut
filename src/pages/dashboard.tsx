import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { getBranchOutServerSession } from "~/server/auth";
import { useSession } from "next-auth/react"

const Dashboard: NextPage = () => {

  return (
    <>
        <h1>Your pages</h1>
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

export default Dashboard;