import fetch from "node-fetch";
import HomeComponent from "../components/HomeComponent";

function getDaysinMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getCurrentMonth() {
  return new Date().getMonth();
}

function getCurrentYear() {
  return new Date().getFullYear();
}

const getPicture = async () => {
  const month = getCurrentMonth();
  const year = getCurrentYear();
  const numDaysinMonth = getDaysinMonth(month, year);
  //   for (let i = 1; i <= numDaysinMonth; i++) {
  //     let picture = await fetch(
  //       `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${i}&api_key=${process.env.APIKEY}`
  //     );
  //     console.log("picture:", picture.url);
  //   }
};

const Gallery = () => {
  // console.log(getPicture());
  return <div>Gallery Picture</div>;
};

export default Gallery;
