"use client";

import { useState } from "react";
import styles from "../../styles/home.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClapSpinner } from "react-spinners-kit";
import Head from "next/head";

function home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = async (word) => {
    if (input !== "") {
      setLoading(true);
      await axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
          setLoading(false);
          const stringRes = JSON.stringify(res.data);
          localStorage.setItem("word", stringRes);
          router.push("/word");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.message === "Network Error") {
            toast.warning("An unnexpected Network error occured", {
              autoClose: 3000,
              closeButton: false,
            });
          }
          if (err.response?.data.title) {
            if (err.response.data.title === "No Definitions Found") {
              toast.warning("No Definitions Found", {
                autoClose: 3000,
                closeButton: false,
              });
            }
          } else {
          }
        });
    } else {
      toast.error("Search for an actual word!", {
        closeButton: false,
        autoClose: 3000,
      });
    }
  };
  const [input, setInput] = useState("");

  return (
    <div className={styles.home}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="white" />
      </Head>
      <header>
        <img src="/book.svg" alt="" />
      </header>

      <div className={styles.image}>
        <img src="/search.svg" className={styles.finder} alt="" />
      </div>

      <div className={styles.container}>
        <h3>Thesaurus</h3>
        <p>Find synonyms, antonyms and related words.</p>
        <label>
          <img src="/searchIcn.svg" alt="" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
        </label>
        <button onClick={() => search(input)}>
          {!loading && "Search"}
          {loading && <ClapSpinner frontColor="white" size={16} />}
        </button>
        {/*       <div className={styles.history}>
          <p>Show history</p> <img src="/downrrow.svg" alt="" />
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default home;
