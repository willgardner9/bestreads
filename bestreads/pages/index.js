import Head from "next/head";
import Header from "../components/Header/Header";
import supabase from "../lib/supabase";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Wrapper from "../components/Global/Wrapper";
import AddChallenge from "../components/Index/AddChallenge";
import Challenge from "../components/Index/Challenge";

export default function Home() {
  const router = useRouter();

  //  auth
  useEffect(() => {
    if (!supabase.auth.currentUser) return router.push("/auth");
  }, [supabase.auth.currentUser]);

  if (!supabase.auth.currentUser) return null;

  //  reading challenge
  const [challenge, setChallenge] = useState();

  useEffect(() => {
    const fetchChallenge = async () => {
      const {data, error} = await supabase
        .from("challenge")
        .select()
        .eq("user", supabase.auth.currentUser.id)
        .eq("year", new Date().getFullYear());

      if (data) {
        setChallenge(data[0]);
      } else {
        console.error(error);
      }
    };
    fetchChallenge();
  }, []);

  //  prompt users to create a reading challenge when they first sign up
  if (challenge && challenge.length === 0)
    return (
      <>
        <Head>
          <title>Bestreads</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <Wrapper>
          <AddChallenge />
        </Wrapper>
      </>
    );

  //  otherwise render standard ui
  return (
    <>
      <Head>
        <title>Bestreads</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Wrapper>
        <Challenge challenge={challenge} />
      </Wrapper>
    </>
  );
}
