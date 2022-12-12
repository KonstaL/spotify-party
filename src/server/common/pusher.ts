import Pusher from "pusher";
import { env } from "./getEnv";

const pusher = new Pusher({
  appId: env("PUSHER_APP_ID"),
  secret: env("PUSHER_SECRET"),
  key: "e505e241c503a1a949d9",
  cluster: "eu",
  useTLS: true,
});

export function forceRefreshQuery(queryName: string) {
  pusher.trigger("main", "refetch", {
    queryName,
  });
}
