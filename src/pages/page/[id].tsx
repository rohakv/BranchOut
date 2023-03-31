import { useRouter } from "next/router";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import Image from "next/image";
import { Work_Sans } from "next/font/google";

const myLoader = () => {
  return `https://robohash.org/32420_234fdg`;
};

const work_sans = Work_Sans({ subsets: ["latin"], weight: "400" })

type Props = {
  pageName: string;
  pageData: Array<any>;
  image: any;
};

const Page: NextPage<Props> = ({ pageName, pageData, image }) => {
  return (
    <>
      <div className={work_sans.className}>
        <div className="h-screen w-full bg-[#111827]">
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              alt="Vercel logo"
              loader={myLoader}
              src={image}
              width={150}
              height={150}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <h1 className="pt-5 text-4xl font-bold text-white">{pageName}</h1>
            <ul className="py-10">
              {pageData.map((data: { type: string; url: string }) => {
                return (
                  <>
                    <div className="flex-shrink-1 flex-grow-1 w-80 py-5 ">
                      <button className="group relative mb-2 mr-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800">
                        <a
                          href={data.url}
                          className="relative w-full flex-shrink-0 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900 font-bold"
                        >
                          {data.type}
                        </a>
                      </button>
                      <br />
                    </div>
                  </>
                );
              })}
            </ul>
              <footer className="flex justify-around">
                <h1 className="text-white">Made by Rohak.</h1>
              </footer>
          </div>
          
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const pageid: ParsedUrlQuery = context.query;

  const id = pageid.id;

  const res: AxiosResponse<any, any> = await axios.post(
    `http://localhost:3000/api/page/getpage`,
    { id }
  );

  const imageres: AxiosResponse<any, any> = await axios.get(
    "https://robohash.org/32420_234fdg"
  );

  const image = imageres.data;

  const data = res?.data;

  const pageName = data[0];

  const pageData = data.splice(1);

  return {
    props: {
      pageName,
      pageData,
      image,
    },
  };
};

export default Page;
