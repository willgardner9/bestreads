import {useState, useEffect} from "react";
import supabase from "../../lib/supabase";
import {useRouter} from "next/router";
import List from "./List";

export default function Booklists() {
  const router = useRouter();
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
  return (
    <div className="mt-12 mb-6 flex flex-col md:flex-row">
      <List
        listTitle="already read"
        listBooks={alreadyReadBooks}
        listEmptyMessage="mark books as read, rate them, and they'll appear here"
      />
      <List
        listTitle="want to read"
        listBooks={wantToReadBooks}
        listEmptyMessage="search for some books and mark them 'want to read'"
      />
    </div>
  );
}
