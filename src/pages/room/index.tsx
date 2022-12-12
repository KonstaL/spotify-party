import { useSession } from "next-auth/react";
import Head from "next/head";

const Header = () => {
  return <header>{/* component code */}</header>;
};

const Hero = () => {
  return (
    <div>
      <h1>This is the folder index</h1>
    </div>
  );
};

const currentSongs = [
  {
    name: "song1",
    artist: "artist1",
    album: "album1",
    image: "image1",
    uri: "uri1",
  },
];

function Dashboard() {
  const session = useSession({ required: true });
  console.log("session", session);
  return (
    <>
      <Head>
        <title>Listening room</title>
      </Head>

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {`${session.data?.user?.name || "default"}'s room`}
        </h1>
      </div>
    </>
  );
}

export default Dashboard;
