import supabase from "../../lib/supabase";
import {useState} from "react";
import {useRouter} from "next/router";

export default function AddChallenge() {
  const router = useRouter();
  const [bookChallengeAmount, setbookChallengeAmount] = useState(5);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookChallengeAmount) {
      return setError("you have to challenge yourself to read some books!");
    }
    const {data, error} = await supabase
      .from("challenge")
      .insert([
        {
          user: supabase.auth.currentUser.id,
          target_books: bookChallengeAmount,
          year: new Date().getFullYear(),
          current_books: 0,
        },
      ])
      .eq("user", supabase.auth.currentUser.id);

    if (data) {
      console.log("data", data);
      router.reload(window.location.pathname);
    } else {
      console.error(error);
    }
  };

  const deleteError = () => {
    setError("");
  };

  return (
    <form
      className="mt-12 flex flex-col mt-6 max-w-md items-center mx-auto"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="name"
        className="flex flex-col w-full text-xs text-gray-500"
      >
        challenge yourself to read {bookChallengeAmount} books this year
        <input
          type="number"
          value={bookChallengeAmount}
          onChange={(e) => setbookChallengeAmount(e.target.value)}
          onFocus={deleteError}
          className="w-full mt-4 border border-gray-200 p-4 text-sm outline-none transition-all duration-75 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:bg-gray-50"
        />
      </label>
      <button className="w-full mt-6 bg-black text-white text-xs font-semibold p-4 transition-all duration-75 border-2 border-white active:bg-white active:border-2 active:border-black active:text-black">
        create challenge
      </button>
      {error ? (
        <div className="mt-6 p-4 border border-red-500 text-red-500 text-xs">
          {error}
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
