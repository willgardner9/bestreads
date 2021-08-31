import AddChallenge from "./AddChallenge";
import ChallengeProgress from "./ChallengeProgress";
import {useState, useEffect} from "react";
import supabase from "../../lib/supabase";
import {useRouter} from "next/router";

export default function Challenge() {
  const router = useRouter();
  //  check if challenge exists and set state accordingly
  const [challengeExists, setChallengeExists] = useState();

  useEffect(() => {
    const fetchChallengeExists = async () => {
      const {data, error} = await supabase
        .from("challenge")
        .select()
        .eq("user", supabase.auth.currentUser.id)
        .eq("year", new Date().getFullYear());

      if (data) {
        setChallengeExists(data);
      } else {
        //  jwt has expired reload page to get new access token
        if (error.message === "JWT expired") {
          router.reload(window.location.pathname);
        }
      }
    };
    fetchChallengeExists();
  }, []);

  //  fetch and update challenge data: updates challenge by querying number of books read
  //  and passes this to challenge component
  const [challenge, setChallenge] = useState();

  useEffect(async () => {
    const fetchBooksRead = async () => {
      const {data, error} = await supabase
        .from("books")
        .select()
        .eq("user", supabase.auth.currentUser.id)
        .eq("finished", true);

      return data ? data : console.error(error);
    };

    const booksRead = await fetchBooksRead();

    const updateChallenge = async (booksRead) => {
      if (booksRead.length) {
        const {data, error} = await supabase
          .from("challenge")
          .update({current_books: booksRead.length})
          .match({user: supabase.auth.currentUser.id});

        return data ? setChallenge(data[0]) : console.error(error);
      }
      return;
    };

    updateChallenge(booksRead);
  }, [router.query.read]);

  return challengeExists && challengeExists.length === 0 ? (
    <AddChallenge />
  ) : (
    <ChallengeProgress challenge={challenge} />
  );
}
