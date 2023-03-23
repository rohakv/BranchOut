import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
  
const Page: NextPage = () => {

    const [pageData, setPageData] = useState(null);
    const [name, setName] = useState("")
  
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
      axios.post("/api/page/getpage", { id })
        .then((res) => {
          console.log(res.data);
        })
    }, [id]);

    return (
        <>
            <h1>Your page: {id}</h1>
        </>
    )
}

export default Page;