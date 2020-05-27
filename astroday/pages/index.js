import React, { useReducer } from "react";
import { DateSingleInput } from "@datepicker-react/styled";
import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";
import PictureinfoComponent from "../components/PictureinfoComponent";
import useSWR, { mutate } from "swr";
import HomeComponent from "../components/HomeComponent";
import search from "../public/searching.svg";

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
  if (!data) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <img className="mh-64 w-64" src={search} alt="searching photo"></img>
          <h1 className="text-center">Fetching Picture</h1>
        </div>
      </div>
    );
  }
  console.log("Data:", DateToday);
  console.log("photographer", data.copyright);
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
      {DateToday === data.date ? (
        <h1 className="text-3xl text-center mt-20">PICTURE OF THE DAY</h1>
      ) : (
        <h1 className="text-3xl text-center mt-20">Picture of {data.date}</h1>
      )}
      {data.url ? (
        <div>
          <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                <img
                  alt="feature"
                  className="object-cover object-center h-full w-full"
                  src={data.url}
                />
              </div>
              <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                <div className="flex flex-col mb-10 lg:items-start items-center">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-5">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-bold mb-3">
                      Title
                    </h2>
                    <p className="leading-relaxed text-base">{data.title}</p>
                  </div>
                </div>
                <div className="flex flex-col mb-10 lg:items-start items-center">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-5">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-bold mb-3">
                      Photographer
                    </h2>
                    <p className="leading-relaxed text-base">
                      {data.copyright ? data.copyright : "N / A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mb-10 lg:items-start items-center">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-5">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-bold mb-3">
                      Description
                    </h2>
                    <p className="leading-relaxed text-base">
                      {data.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        "no image found"
      )}
    </HomeComponent>
  );
};

export default PictureOftheDay;
