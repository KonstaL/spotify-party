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
        <title>My cool dashboard</title>
      </Head>
      <Header />
      <Hero />
    </>
  );
}

export default Dashboard;
