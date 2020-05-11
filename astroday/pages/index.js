import React, { useReducer } from "react";
import { DateSingleInput } from "@datepicker-react/styled";
import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";
import Sample from "./info/sample";
import useSWR from "swr";
import HomeComponent from "../components/HomeComponent";

let getDateToday = () => {
  return new Date().toISOString().slice(0, 10);
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
  const { data, error } = useSWR(`./api/NasaAPI?date=${DateToday}`, fetcher);

  if (error) console.log("error loading data");
  if (!data) return <div>Fetching Picture</div>;
  console.log("Data:", data);

  console.log("Picked Date:", state.date);

  return (
    // <div>
    //   <h1>Date: {DateToday}</h1>
    // </div>
    <HomeComponent>
      <DateSingleInput
        onDateChange={(data) => dispatch({ type: "dateChange", payload: data })}
        onFocusChange={(focusedInput) =>
          dispatch({ type: "focusChange", payload: focusedInput })
        }
        date={state.date}
        showDatepicker={state.showDatepicker}
        displayFormat="yyyy-MM-dd"
      />
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
