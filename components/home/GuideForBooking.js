import React from "react";
import styles from "../../styles/homeStyles/GuideForBooking.module.css";
import Image from "next/image";
// import PhoneScreen from "../../utils/images/PhoneScreen.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const GuideForBooking = () => {
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
          <button>Find an Expert</button>
        </div>
      </div>
    </div>
  );
};

export default GuideForBooking;
