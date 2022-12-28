"use client";

import { useState } from "react";
import styles from "../../styles/home.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function home() {
  const router = useRouter();
  const search = async (word) => {
    if (input !== "") {
      await axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
          const stringRes = JSON.stringify(res.data);
          localStorage.setItem("word", stringRes);
          router.push("/word");
        })
        .catch((err) => console.log(err));
    } else {
      toast.warning("Search for an actual word!", {
        closeButton: false,
        autoClose: 3000,
      });
    }
  };
  const [input, setInput] = useState("");
  return (
    <div className={styles.home}>
      <header>
        <div className={styles.menu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <img src="/search.svg" className={styles.finder} alt="" />

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
      </div>
      <button onClick={() => search(input)}>Search</button>
      <div className={styles.history}>
        <p>Show history</p> <img src="/downrrow.svg" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
}

export default home;
