import Wrapper from "../Global/Wrapper";
import BestreadsLogo from "../Global/BestreadsLogo";
import supabase from "../../lib/supabase";
import {useRouter} from "next/router";
import SearchBar from "./SearchBar";

export default function Header() {
  const router = useRouter();

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (!error) {
      router.push("/auth");
    }
  };

  return (
    <header className="w-screen h-16 border-b border-gray-200 flex items-center">
      <Wrapper>
        <div className="flex items-center justify-between">
          <BestreadsLogo />
          <SearchBar />
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-400 hover:text-gray-500"
          >
            sign out
          </button>
        </div>
      </Wrapper>
    </header>
  );
}
