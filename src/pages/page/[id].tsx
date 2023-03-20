import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect } from "react";

const Page: NextPage = () => {
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        console.log(id);
    }, [id])

    return (
        <>
            <h1>Your page: {id}</h1>
        </>
    )
}

export default Page;