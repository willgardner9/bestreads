import Head from "next/head";
import Header from "../components/Header/Header";
import supabase from "../lib/supabase";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Wrapper from "../components/Global/Wrapper";
import AddChallenge from "../components/Index/AddChallenge";
import Challenge from "../components/Index/Challenge";
import DbBookCard from "../components/BookCard/DbBookCard";

export default function Home() {
  const router = useRouter();

  //  auth
  useEffect(() => {
    if (!supabase.auth.currentUser) return router.push("/auth");
  }, [supabase.auth.currentUser]);

  if (!supabase.auth.currentUser) return null;

  //  reading challenge data and ui
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
        //  jwt has expired reload page to get new access token
        if (error.message === "JWT expired") {
          router.reload(window.location.pathname);
        }
      }
    };
    fetchChallenge();
  }, []);

  //  fetch already read books and set to state variable
  const [alreadyReadBooks, setalreadyReadBooks] = useState();

  useEffect(() => {
    const fetchAlreadyReadBooks = async () => {
      const {data, error} = await supabase
        .from("books")
        .select()
        .eq("user", supabase.auth.currentUser.id)
        .eq("finished", true);

      if (data) {
        setalreadyReadBooks(data);
      } else {
        //  jwt has expired reload page to get new access token
        if (error.message === "JWT expired") {
          router.reload(window.location.pathname);
        }
      }
    };
    fetchAlreadyReadBooks();
  }, [router.query.read]);

  //  fetch want to read books and set to state variable
  const [wantToReadBooks, setwantToReadBooks] = useState();

  useEffect(() => {
    const fetchWantToReadBooks = async () => {
      const {data, error} = await supabase
        .from("books")
        .select()
        .eq("user", supabase.auth.currentUser.id)
        .eq("finished", false);

      if (data) {
        setwantToReadBooks(data);
      } else {
        //  jwt has expired reload page to get new access token
        if (error.message === "JWT expired") {
          router.reload(window.location.pathname);
        }
      }
    };
    fetchWantToReadBooks();
  }, [router.query.read]);

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
        <div className="mt-12 flex flex-col md:flex-row">
          {/* already read list */}
          <section className="flex flex-col w-full md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-sm font-semibold">already read</h2>
            {alreadyReadBooks ? (
              alreadyReadBooks.map((book, i) => (
                <DbBookCard book={book} key={i} />
              ))
            ) : (
              <div className="text-xs text-gray-500 mt-2">
                mark books as read, rate them, and they'll appear here
              </div>
            )}
          </section>
          {/* want to read list */}
          <section className="flex flex-col w-full md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-sm font-semibold">want to read</h2>
            {wantToReadBooks ? (
              wantToReadBooks.map((book, i) => (
                <DbBookCard book={book} key={i} />
              ))
            ) : (
              <div className="text-xs text-gray-500 mt-2">
                search for some books and mark them 'want to read'
              </div>
            )}
          </section>
        </div>
      </Wrapper>
    </>
  );
}
