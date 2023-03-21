import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { getBranchOutServerSession } from "~/server/auth";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import { useEffect } from "react";
import type { Session } from "next-auth";

type DashboardProps = {
  sessionData: Session;
  pages: AxiosResponse<any, any>;
};

const Dashboard: NextPage<DashboardProps> = ({ sessionData, pages }) => {

  console.log(`Pages: ${JSON.stringify(pages)}`);

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

    const sessionData = session;

    let pages = await axios.post(`${env.NEXTAUTH_URL}/api/pages`, sessionData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    pages = pages.data;

    console.log(pages)

    return {
      props: {
        sessionData,
        pages
      },
    }
}

export default Dashboard;