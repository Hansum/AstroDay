import fetch from "node-fetch";

const API = async (date) => {
  return await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.APIKEY}`
  );
};

const APIresponse = async ({ query: { date } }, res) => {
  // console.log("Request received", JSON.parse(req.query.date));
  console.log("REQUEST", date);
  if (!date) {
    console.log("no date found");
  }
  const ret = await API(date);
  const APIresponse = await ret.json();
  if (APIresponse) {
    res.status(200).json(APIresponse);
  } else {
    res.status(404).json({ status: "error no picture found" });
  }
};

export default APIresponse;
