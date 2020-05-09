import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";
import Sample from "./info/sample";

const PictureOftheDay = ({ picture }) => {
  return (
    <div>
      <h1>PICTURE OF THE DAY</h1>
      <Link
        href={{
          pathname: "/info/sample",
          query: {
            date: `${picture.date}`,
            title: `${picture.title}`,
            photographer: `${picture.copyright}`,
            picture: `${picture.url}`,
          },
        }}
      >
        <img
          src={picture.url}
          alt="picture of the day"
          style={{ cursor: "pointer" }}
        ></img>
      </Link>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.APIKEY}`
  );
  const picture = await res.json();

  if (!picture) {
    return;
  }

  return {
    props: {
      picture,
    },
  };
}

export default PictureOftheDay;
