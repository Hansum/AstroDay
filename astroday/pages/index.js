import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";
import Sample from "./info/sample";
import useSWR from "swr";
import HomeComponent from "../components/HomeComponent";

let getDateToday = () => {
  return new Date().toISOString().slice(0, 10);
};

const fetcher = (url) => fetch(url).then((r) => r.json());

const PictureOftheDay = () => {
  const DateToday = getDateToday();
  const { data, error } = useSWR(`./api/NasaAPI?date=${DateToday}`, fetcher);

  if (error) console.log("error loading data");
  if (!data) return <div>Fetching Picture</div>;
  console.log("Data:", data);

  return (
    // <div>
    //   <h1>Date: {DateToday}</h1>
    // </div>
    <HomeComponent>
      <h1>PICTURE OF THE DAY</h1>
      <Link
        href={{
          pathname: "/info/sample",
          query: {
            date: `${data.date}`,
            title: `${data.title}`,
            photographer: `${data.copyright}`,
            picture: `${data.url}`,
          },
        }}
      >
        <img
          src={data.url}
          alt="picture of the day"
          style={{ cursor: "pointer" }}
        ></img>
      </Link>
    </HomeComponent>
  );
};

export default PictureOftheDay;
