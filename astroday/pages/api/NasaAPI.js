import fetch from "node-fetch";

const API = async (date) => {
  return await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.APIKEY}`
  );
};
// const pictureResult = API("2020-05-10");
// pictureResult
//   .then((message) => {
//     console.log("API message", message);
//   })
//   .catch((err) => {
//     console.log("API ERROR", err);
//   });

const APIresponse = async ({ query: { date } }, res) => {
  if (!date) {
    console.log("no date found");
  }
  const ret = await API(date);
  const APIresponse = await ret.json();
  //   console.log("response", await ret.json());
  //   console.log("PICTURE DATA", picture);
  if (APIresponse) {
    res.status(200).json(APIresponse);
  } else {
    res.status(404).json({ status: "error no picture found" });
  }
};

export default APIresponse;
