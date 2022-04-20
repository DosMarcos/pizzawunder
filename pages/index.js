import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>DosMarco's Pizzawunder</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />      
      <PizzaList pizzaList={pizzaList} />      
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("https://pizzawunder.vercel.app/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};