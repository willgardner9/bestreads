import Head from "next/head";
import BestreadsLogo from "../components/Global/BestreadsLogo";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import supabase from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (supabase.auth.currentUser) return router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  check email is provided. If not, set error message
    if (!email) {
      return setError("You need to provide an email");
    }
    //  set loading to true for ui
    setLoading(true);
    //  attempt auth with supabase
    const {error} = await supabase.auth.signIn({email});
    //  if auth error, set loading to false for ui and set error message
    if (error) {
      setLoading(false);
      setError("something went wrong... try again soon");
    }
    //  auth success, set loading to false for ui and set success true for ui
    setLoading(false);
    setSuccess(true);
  };

  const deleteError = () => {
    setError(false);
  };

  return (
    <>
      <Head>
        <title>Bestreads</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="mt-24 mx-auto flex flex-col items-center justify-center">
        <BestreadsLogo />
        <form className="flex flex-col mt-6" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="text-xs text-gray-500 flex flex-col items-center"
          >
            enter your email below to receive a sign in link
            <input
              type="email"
              htmlFor="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={deleteError}
              className="w-64 mt-6 border border-gray-200 p-4 text-sm outline-none transition-all duration-75 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:bg-gray-50"
            />
          </label>
          <button className="mt-6 bg-black text-white text-xs font-semibold p-4 transition-all duration-75 border-2 border-white active:bg-white active:border-2 active:border-black active:text-black">
            {loading ? "signing in..." : "sign in"}
          </button>
        </form>
        {error ? (
          <div className="mt-6 p-4 border border-red-500 text-red-500 text-xs">
            {error}
          </div>
        ) : (
          ""
        )}
        {success ? (
          <div className="mt-6 p-4 border border-green-600 text-green-600 text-xs">
            success! check your inbox for your login link
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
