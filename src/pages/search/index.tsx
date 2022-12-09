import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useDebounce } from "../../hooks/debounce";

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

interface Album {
  id: string;
  name: string;
  album_type: "single" | "album";
  images: {
    height: number;
    width: number;
    url: string;
  }[];
}

interface SearchResult {
  id: string;
  name: string;
  duration_ms: number;
  artists: {
    name: string;
    id: string;
  }[];
  album: Album;
}

const exampleSearchResults: SearchResult[] = [
  {
    id: "5Y0Fl1dx7zmMOD35v7LNhf",
    name: "CPR",
    artists: [{ name: "nihmune", id: "0mhXOWxkDI2KtV3x0Vd19s" }],
    duration_ms: 208169,
    album: {
      id: "5Y0Fl1dx7zmMOD35v7LNhf",
      name: "CPR",
      album_type: "single",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273dc9ab62ffc05d43b290f6136",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e02dc9ab62ffc05d43b290f6136",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d00004851dc9ab62ffc05d43b290f6136",
          width: 64,
        },
      ],
    },
  },
  {
    id: "64VGnSi0hEr9OJcZfzQmpu",
    name: "20 Ave Mariaa",
    artists: [{ id: "0SZkRVbgQe92d3RdjmYh9f", name: "Kirkkovene" }],
    duration_ms: 197040,
    album: {
      album_type: "album",
      name: "Tubehitit, Vol. 2",
      id: "4LWYKQibFDrl3yaz40obf1",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273e57bc555bb991ec74c1be00c",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e02e57bc555bb991ec74c1be00c",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d00004851e57bc555bb991ec74c1be00c",
          width: 64,
        },
      ],
    },
  },
];

function Search() {
  const [searchResults, setSearchResults] = useState([...exampleSearchResults]);

  useDebounce(() => {
    fetch("https://api.spotify.com/v1/search?q=20&type=track")
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.tracks.items as SearchResult[]);
      });
  }, 1000);

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <div className="h-full w-full">
        <div className="w-full bg-gray-200 shadow-md">
          <input
            placeholder="Search for a song"
            className="rounded-2xl p-4 px-5 placeholder-gray-500  opacity-70
          bg-blend-darken
          transition
          ease-in-out"
          />
        </div>

        <div className="flex h-full flex-grow flex-col bg-gray-400 p-4">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="mb-4 flex max-h-40 flex-row overflow-hidden rounded-xl bg-white shadow-md"
            >
              <Image
                className="-"
                src={result.album.images[2]?.url ?? ""}
                width={result.album.images[2]?.width ?? 0}
                height={result.album.images[2]?.height ?? 0}
                alt={result.album.name}
              />

              <div className="flex flex-col p-2">
                <h1>{result.name}</h1>
                <h2>{result.artists.map((a) => a.name)}</h2>
              </div>
            </div>
          ))}
          <div className="flex flex-row"></div>
        </div>
      </div>
    </>
  );
}

export default Search;
