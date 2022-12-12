import { createContext, useContext } from "react";
import type Pusher from "pusher-js";

interface PusherContext {
  pusher: Pusher;
}

const PusherContext = createContext<PusherContext | null>(null);

function PusherProvider({
  pusher,
  children,
}: {
  pusher: Pusher;
  children: React.ReactNode;
}) {
  return (
    <PusherContext.Provider value={{ pusher }}>
      {children}
    </PusherContext.Provider>
  );
}

function usePusher() {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error("usePusher must be used within a PusherProvider");
  }

  const { pusher } = context;
  return pusher;
}

export { PusherProvider, usePusher };
