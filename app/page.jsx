"use client";

import styles from "../styles/splash.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function splash() {
  const router = useRouter();

  const redirectTimer = () => {
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      redirectTimer();
    } else {
    }
  }, [document.readyState]);

  return (
    <div className={styles.splash}>
      <img src="/book.svg" alt="" />
      <p>Wordly</p>
      <ToastContainer />
    </div>
  );
}

export default splash;
