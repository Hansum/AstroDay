import fetch from "node-fetch";
import HomeComponent from "../components/HomeComponent";
import { useSWR } from "swr";

function getDaysinMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getCurrentMonth() {
  return new Date().getMonth();
}

function getCurrentYear() {
  return new Date().getFullYear();
}

// const fetcher = (url) => fetch(url).then((r) => r.json());

// const getPicture = async () => {
//   const month = await getCurrentMonth();
//   const year = await getCurrentYear();
//   const numDaysinMonth = await getDaysinMonth(month, year);
//   //   for (let i = 1; i <= numDaysinMonth; i++) {
//   //     let picture = await fetch(
//   //       `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${i}&api_key=${process.env.APIKEY}`
//   //     );
//   //     console.log("picture:", picture.url);
//   //   }
//   return numDaysinMonth;
// };

const Gallery = ({ days }) => {
  // console.log(getPicture());
  // const  {data, error} = useSWR(`./api/NasaAPI?date=`, fetcher);

  return <div>Gallery Picture {days}</div>;
};

export async function getStaticProps() {
  const month = await getCurrentMonth();
  const year = await getCurrentYear();
  const days = await getDaysinMonth(month, year);

  console.log("Year:", year);
  console.log("Month:", month);
  console.log("Days:", days);
  // for (let i = 1; i <= 3; i++) {
  //   let res = await fetch(
  //     `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${i}&api_key=${process.env.APIKEY}`
  //   );
  //   console.log("data:", await res.json());
  // }

  return {
    props: {
      days,
    },
  };
}

export default Gallery;
