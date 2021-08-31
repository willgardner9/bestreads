import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header/Header.js"));
import supabase from "../lib/supabase";
import {useRouter} from "next/router";
import {useEffect} from "react";
const Wrapper = dynamic(() => import("../components/Global/Wrapper.js"));
import Challenge from "../components/Challenge/Challenge";
import Booklists from "../components/Booklist/Booklists";

export default function Home() {
  const router = useRouter();

  //  auth
  useEffect(() => {
    if (!supabase.auth.currentUser && router.asPath.length < 10)
      return router.push("/auth");
  }, [supabase.auth.currentUser, router.isReady]);

  if (!supabase.auth.currentUser) return null;

  return (
    <>
      <Head>
        <title>bestreads</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Wrapper>
        <Challenge />
        <Booklists />
      </Wrapper>
    </>
  );
}
