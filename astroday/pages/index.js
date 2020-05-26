import React, { useReducer } from "react";
import { DateSingleInput } from "@datepicker-react/styled";
import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";
import PictureinfoComponent from "../components/PictureinfoComponent";
import useSWR, { mutate } from "swr";
import HomeComponent from "../components/HomeComponent";

let getDateToday = () => {
  return new Date().toISOString().slice(0, 10);
};

let ConvertDate = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

const initialState = {
  date: null,
  showDatepicker: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "focusChange":
      return { ...state, showDatepicker: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
};

const fetcher = (url) => fetch(url).then((r) => r.json());

const PictureOftheDay = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const DateToday = getDateToday();
  const { data, error } = useSWR(
    state.date
      ? `./api/NasaAPI?date=` + ConvertDate(state.date)
      : `./api/NasaAPI?date=` + DateToday,
    fetcher
  );

  if (error) console.log("error loading data");
  if (!data) return <div>Fetching Picture</div>;
  console.log("Data:", DateToday);

  return (
    <HomeComponent>
      <div className="flex justify-center">
        <div className="4/5 lg:w-1/5">
          <DateSingleInput
            onDateChange={(data) =>
              dispatch({ type: "dateChange", payload: data })
            }
            onFocusChange={(focusedInput) =>
              dispatch({ type: "focusChange", payload: focusedInput })
            }
            date={state.date}
            showDatepicker={state.showDatepicker}
            displayFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <h1 className="text-3xl text-center mt-20">PICTURE OF THE DAY</h1>
      {data.url ? (
        <div>
          <img
            src={data.url}
            alt="picture of the day"
            className="block m-auto"
          ></img>
          <PictureinfoComponent
            title={data.title}
            date={data.date}
            photographer={data.copyright}
            description={data.explanation}
          ></PictureinfoComponent>
        </div>
      ) : (
        "no image found"
      )}
    </HomeComponent>
  );
};

export default PictureOftheDay;
