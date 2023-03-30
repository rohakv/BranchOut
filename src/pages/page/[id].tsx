import { useRouter } from "next/router";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import Image from 'next/image'

const myLoader = () => {
  return `https://robohash.org/32420_234fdg`
}

type Props = {
  pageName: string;
  pageData: Array<any>;
  image: any
};

interface PageData {
  type: string;
  url: string;
}

const Page: NextPage<Props> = ({ pageName, pageData, image }) => {
  return (
    <>
    <div>
      <div className="w-full h-screen bg-[url('/img/background.png')]">
        <div className="flex flex-col items-center justify-center text-center">
        <Image
          alt="Vercel logo"
          loader={myLoader}
          src={image}
          width={150}
          height={150}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <h1 className="font-bold pt-5 text-4xl text-[#0080A1]">{pageName}</h1>
        <ul className="py-10">
          {pageData.map((data: {
            type: string; url: string;
          }) => {
            return (
              <>
                <div className="py-5 flex-shrink-1">
                  <a href={data.url} className="bg-[#9AE6F9] hover:bg-[#0080A1] hover:text-[#9AE6F9] text-[#0080A1] font-bold py-2 px-10 rounded">{data.type}</a><br />
                </div>
              </>
            )
          })}
        </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const pageid: ParsedUrlQuery = context.query;

  const id = pageid.id;

  const res: AxiosResponse<any, any> = await axios.post(`http://localhost:3000/api/page/getpage`, { id });

  const imageres: AxiosResponse<any, any> = await axios.get("https://robohash.org/32420_234fdg");

  const image = imageres.data;

  const data = res?.data;

  const pageName = data[0];

  const pageData = data.splice(1);

  return {
    props: {
      pageName,
      pageData,
      image
    }
  };
}

export default Page;
