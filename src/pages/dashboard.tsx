import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { getBranchOutServerSession } from "~/server/auth";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import { useEffect } from "react";
import type { Session } from "next-auth";

type DashboardProps = {
  sessionData: Session;
  pages: any;
};

const Dashboard: NextPage<DashboardProps> = ({ sessionData, pages }) => {

  return (
    <>
      <h1>Your pages</h1>
      <ul>
      {pages.map(i => {
          return (
            <>
              <li key={i}>{JSON.stringify(i)}</li>
            </>
          )
        })}
      </ul>
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

    const sessionData = session;

    const res = await axios.post(`${env.NEXTAUTH_URL}/api/pages`, {sessionData});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pages = res.data;

    return {
      props: {
        sessionData,
        pages
      },
    }
}

export default Dashboard;