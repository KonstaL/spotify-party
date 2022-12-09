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

function Dashboard() {
  return (
    <>
      <Head>
        <title>Listening room</title>
      </Head>

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {"konkarit's room"}
        </h1>
      </div>
    </>
  );
}

export default Dashboard;
