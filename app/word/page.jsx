"use client";

import styles from "../../styles/word.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

function word() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const response = localStorage.getItem("word");
    const data = JSON.parse(response);
    console.log(data);
    setInfo(data);
  }, []);
  const router = useRouter();
  return (
    <div className={styles.word}>
      <Head>
       
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="white" />
      </Head>
      <header>
        <img onClick={() => router.back("-1")} src="/downrrow.svg" alt="" />
      </header>

      {info?.map((e) => (
        <>
          <div className={styles.main}>
            <h1>{e.word}</h1>
            <p>
              <span>pronounced - </span>
              {e.phonetic}
            </p>
          </div>
          {e.meanings.map((m, i) => (
            <>
              <div className={styles.box}>
                <h1>Word {i + 1} </h1>

                <div className={styles.content}>
                  <h3> part of speech </h3>
                  <p>{m.partOfSpeech}</p>
                  {m.definitions.slice(0, 5).map((d, i) => (
                    <>
                      <h3> Definition</h3>
                      <h4>
                        <span>{i + 1}</span>
                        {d.definition}
                      </h4>
                      <h3>example</h3>
                      <h5>
                        {d.example ? (
                          <span>{d.example}</span>
                        ) : (
                          <span>No example for this word in our database</span>
                        )}
                      </h5>
                    </>
                  ))}

                  <p></p>
                </div>
              </div>
            </>
          ))}

          {/*           <div className={styles.box}>
            <h1>Origin</h1>
            <div className={styles.content}>
              <p>{e.origin}</p>
            </div>
          </div> */}
        </>
      ))}
    </div>
  );
}

export default word;
