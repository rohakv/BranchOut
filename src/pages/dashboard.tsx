/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { getBranchOutServerSession } from "~/server/auth";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect } from "react";
import type { Session } from "next-auth";

type DashboardProps = {
  sessionData: Session;
  pages: any;
};

const Dashboard: NextPage<DashboardProps> = ({ sessionData, pages }) => {

  return (
    <>
      <h1 className="font-bold">Your pages</h1>
      <ul>
        {pages.map((page: {
            pageURL: string; name: string;
          }) => {
          return (
            <>
              <li><a href={`/page/${page.pageURL}`} key={page.name} className="text-blue-400">{page.name} - {page.pageURL}</a></li>
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

    const res: AxiosResponse<any, any> = await axios.post(`${env.NEXTAUTH_URL}/api/pages`, {sessionData});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let pages: any = res.data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    pages = pages.pages;

    return {
      props: {
        sessionData,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        pages
      },
    }
}

export default Dashboard;