import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { auth0 } from "../lib/auth0";
import { redirect } from "next/navigation";

const Home = () => {
  const session = auth0.getSession();
  if (session) return redirect("/chat");
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Head>
        <title>Hello Welcome to Luna AI Chat</title>
      </Head>
      <main className=" min-h-screen w-full bg-gray-800 text-white text-center flex flex-col items-center justify-center gap-4">
        <Link className="cursor-pointer" href="/auth/login?screen_hint=signup">
          <button className="cursor-pointer rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">Sign up</button>
        </Link>

        {!session ? (
          <Link href="/auth/login">
            <button className="cursor-pointer rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">Log in</button>
          </Link>
        ) : (
          <Link href="/auth/logout" className="cursor-pointer rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
            Logout
          </Link>
        )}
      </main>
    </div>
  );
};

export default Home;
