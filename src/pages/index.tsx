import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Divider } from "../components/divider";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Spotify party</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Party with Spotify
          </h1>

          <div className="">
            <form className="flex flex-col">
              <div>
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label mb-2 ml-4 inline-block text-gray-500"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="
        form-control
        m-0
        

        w-full
        rounded-2xl
        p-4
        px-5
        placeholder-gray-500 
        opacity-70
        bg-blend-darken
        transition
        ease-in-out
       
      "
                  id="exampleFormControlInput1"
                  placeholder="Your name"
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label mb-2 ml-4 inline-block text-gray-500"
                >
                  Room code
                </label>
                <input
                  type="text"
                  className="
        form-control
        m-0
        

        w-full
        rounded-2xl
        p-4
        px-5
        placeholder-gray-500 
        opacity-70
        bg-blend-darken
        transition
        ease-in-out
       
      "
                  id="exampleFormControlInput1"
                  placeholder="6-letter room code"
                />
              </div>
              <button
                type="submit"
                className="my-4 rounded-2xl bg-green-600 p-4 uppercase text-green-300 hover:bg-green-500"
              >
                Join
              </button>
            </form>

            <Divider text="or" />
            <div className="flex">
              <button className="my-4 flex flex-grow justify-center rounded-2xl bg-green-600 p-4 uppercase text-green-300 hover:bg-green-500">
                Create a room
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
