import { useRouter } from "next/router";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import type { ParsedUrlQuery } from "querystring";


type Props = {
  pageName: string,
  pageData: Array<any>
};

interface PageData {
  type: string;
  url: string;
};

const Page: NextPage<Props> = ({pageName, pageData}) => {
  return (
    <>
    <ul>
      <h1 className="font-bold">Your page</h1>
      {pageData.map((data: {
          type: string; url: string;
        }) => {
          return (
            <>
              <a href={data.url}>{data.type}</a><br />
            </>
          )
        })}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const pageid: ParsedUrlQuery = context.query;

  const id = pageid.id;

  const res: AxiosResponse<any, any> = await axios.post(`http://localhost:3000/api/page/getpage`, { id });

  const data = res?.data;

  const pageName = data[0];

  const pageData = data.splice(1);

  return {
    props: {
      pageName,
      pageData
    }
  };
}

export default Page;
