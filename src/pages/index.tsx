import { type NextPage } from "next";
import { getBranchOutServerSession } from "~/server/auth";
import type { GetServerSidePropsContext } from "next";

const Home: NextPage = () => {
  return (
    <>
      
    </>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {

  const data = getBranchOutServerSession(context)

  return { props: { data } }
}

export default Home;
