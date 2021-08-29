import Head from "next/head";
import Header from "../components/Header/Header";
import supabase from "../lib/supabase";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Wrapper from "../components/Global/Wrapper";
import BookCard from "../components/Global/BookCard";

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState(null);
  //  auth
  useEffect(() => {
    if (!supabase.auth.currentUser) return router.push("/auth");
  }, [supabase.auth.currentUser]);

  if (!supabase.auth.currentUser) return null;

  //  query google books api for search term
  useEffect(() => {
    if (!router.isReady) return;
    const fetchBooks = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${router.query.search}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBooks(res);
        });
    };
    fetchBooks();
  }, [router.isReady, router.query.search]);

  return (
    <>
      <Head>
        <title>Bestreads</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Wrapper>
        <section className="mx-auto mt-12 max-w-3xl">
          {books
            ? books.items.map((book, i) => <BookCard book={book} key={i} />)
            : ""}
        </section>
      </Wrapper>
    </>
  );
}
