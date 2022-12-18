import React, { useState, useEffect } from "react";
import styles from "../../styles/homeStyles/GuideForBooking.module.css";
import Image from "next/image";
// import PhoneScreen from "../../utils/images/PhoneScreen.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const GuideForBooking = () => {
  const router = useRouter();
  const [screenBg, setScreenBg] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      if (screenBg == 5) {
        setScreenBg(1);
        return;
      }
      setScreenBg(screenBg + 1);
    }, 4000);
  }, [screenBg]);

  return (
    <div className={styles.guide__wrapper}>
      <h1>Book Appointment in 3 easy steps</h1>
      <div className={styles.guide__container}>
        <div className={styles.phone__wrapper}>
          {/* <Image
            src="/images/PhoneScreen.jpg"
            alt="Picture of the author"
            width={310}
            height={400}
          /> */}
          <div></div>
          <span
            className={`${styles.phone__screen__content__box} ${
              screenBg == 1
                ? styles.one
                : screenBg == 2
                ? styles.two
                : screenBg == 3
                ? styles.three
                : screenBg == 4
                ? styles.four
                : styles.five
            }`}
          ></span>
        </div>
        <div className={styles.guidelines__container}>
          <div>
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <p>
              <span>Search</span> for Experts by specialty, Category, Experience
              or Performance
            </p>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <p>
              {" "}
              <span>Select</span> based on Experience, Fee or Rating
            </p>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faCalendarPlus} />
            </span>
            <p>
              {" "}
              <span>Book</span> a Confirmed Appointment within Seconds
            </p>
          </div>
          <button onClick={() => router.push("/experts")}>
            Find an Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideForBooking;
