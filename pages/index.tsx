import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { addWeeks, format, formatDistance, parseISO } from "date-fns";
import { GetMyDeckData } from "../types";
import { TrendingUpIcon } from "@heroicons/react/solid";

const AVG_DATA_LENGTH = 4;
const ORDERS_PER_WEEK = 2;

interface Props {
  elapsedTimePercentage: number;
  lastElapsedTimeIncrement: number;
  averageElapsedPercentage: number;
  lastDataUpdate: string;
}

const Home: NextPage<Props> = ({
                                 elapsedTimePercentage,
                                 lastElapsedTimeIncrement,
                                 averageElapsedPercentage,
                                 lastDataUpdate,
                               }: Props) => {

  const percentageLeft = 100 - elapsedTimePercentage;
  const remainingOrders = Math.ceil(percentageLeft / averageElapsedPercentage);
  const remainingWeeks = remainingOrders / ORDERS_PER_WEEK;

  return (
    <div className={"h-screen bg-green-dark text-beige-light flex flex-col items-center"}>
      <Head>
        <title>Deck | tgfnds</title>
        <meta name="description" content="Tracking my steamdeck order progress." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"flex-1 flex flex-col items-center justify-center gap-14 text-lg"}>
        <div className={"flex flex-col items-center gap-8"}>
          <Image src={"/images/steamdeck-logo.png"} width={225 / 4} height={300 / 4} alt={"steamdeck"} />
          <h1 className={"text-3xl sm:text-4xl text-green-light"}>Where is my deck?!</h1>
        </div>

        <div className={"flex flex-col items-center gap-4"}>
          <p className={"text-xl text-green-light"}>{"Progress"}</p>
          <p className={"text-xl sm:text-3xl"}>
            <span>{elapsedTimePercentage}</span>
            <sub className={"text-green-light"}> /100</sub>
          </p>
          <div className={"mt-2 flex items-center gap-3"}>
            <TrendingUpIcon className={"h-[26px] text-brown bg-green-light rounded p-0.5"} />
            <p className={"text-xl text-brown"}>{
              lastElapsedTimeIncrement > 0
                ? lastElapsedTimeIncrement.toFixed(2)
                : 0
            }</p>
          </div>
        </div>

        <div className={"flex flex-col items-center gap-2"}>
          <p className={"text-green-light"}>Order should be available in</p>
          <p className={"text-xl sm:text-3xl"}>
            <span>{remainingWeeks}</span>
            <span className={"ml-2"}>weeks</span>
          </p>
          <p className={"mt-2 sm:text-lg"}>
            <span className={"text-green-light mr-2"}>around</span>
            <span className={"text-brown"}>
              {format(
                addWeeks(new Date(), remainingWeeks),
                "dd 'of' MMM, yyyy",
              )}
            </span>
          </p>
        </div>

        <div className={"mt-10 flex flex-col items-center"}>
          <p className={"text-green-light"}>
            <span>Last updated </span>
            <span>
              {formatDistance(
                parseISO(lastDataUpdate), new Date(), {
                  addSuffix: true,
                },
              )}
            </span>
          </p>
        </div>
      </main>

      <footer className={"py-2 flex flex-col gap-1 items-center justify-between"}>
        <div className={"text-sm"}>
          <span>Made by </span>
          <a className={"text-brown hover:text-yellow-500"}
             href="https://tgfnds.dev"
             target="_blank"
             rel="noopener noreferrer"
          >
            @tgfnds
          </a>
        </div>
        <div className={"text-sm"}>
          <span>Special thanks to </span>
          <a className={"text-brown hover:text-yellow-500"}
             href={"https://getmydeck.ingenhaag.dev/"}
             target="_blank"
             rel="noopener noreferrer"
          >Labidou51</a>
        </div>
      </footer>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<GetMyDeckData>(
    "https://getmydeck.ingenhaag.dev/api/v2/regions/EU/versions/256/infos/1628361316",
  );

  const hist = data.personalInfo.historicData
    .slice(0, AVG_DATA_LENGTH)
    .map((h) => h.elapsedTimePercentage);

  const lastElapsedTimeIncrement = hist[0] - hist[1];

  let averageElapsedPercentage = 0;
  for (let i = 0; i < hist.length - 1; i++) {
    const diff = hist[i] - hist[i + 1];
    averageElapsedPercentage += diff;
  }

  averageElapsedPercentage = averageElapsedPercentage / AVG_DATA_LENGTH;

  return {
    props: {
      elapsedTimePercentage: data.personalInfo.elapsedTimePercentage,
      lastElapsedTimeIncrement,
      averageElapsedPercentage,
      lastDataUpdate: data.officialInfo.lastDataUpdate,
    } as Props,
  };
}

export default Home;
