import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Pusher from "pusher-js";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { PusherProvider } from "../hooks/pusher";

// Pusher handles our websocket connections
const pusher = new Pusher("e505e241c503a1a949d9", {
  cluster: "eu",
  forceTLS: true,
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PusherProvider pusher={pusher}>
        <Component {...pageProps} />
      </PusherProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
