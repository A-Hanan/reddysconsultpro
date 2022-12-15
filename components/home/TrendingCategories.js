import React from "react";
import styles from "../../styles/homeStyles/TrendingCategories.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";

import Link from "next/link";

const TrendingCategories = () => {
  const router = useRouter();
  const [{ activeCategory }, dispatch] = useStateValue();
  return (
    <>
      <div className={styles.tc__conatainer}>
        <h1>Browse Expert By Category</h1>
        <div className={styles.categoriesGrid}>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "O1 Visa And EB GreenCard",
              });
              router.push("/experts");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faUserGroup} />
              <p>33 Experts</p>
            </span>
            <p>O1 Visa and EB Green Card</p>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "Consulting",
              });
              router.push("/experts");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faUserGroup} />
              <p>20 Experts</p>
            </span>
            <p>Consulting</p>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "Resumes And Interviews",
              });
              router.push("/experts");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faUserGroup} /> <p>40 Experts</p>
            </span>
            <p>Resumes and Interviews</p>
          </div>
          <div
            onClick={() => {
              {
                dispatch({
                  type: "SET_ACTIVE_CATEGORY",
                  activeCategory: "Speciality Topics",
                });
                router.push("/experts");
              }
            }}
          >
            <span>
              <FontAwesomeIcon icon={faUserGroup} />
              <p>50 Experts</p>
            </span>
            <p>Speciality Topics</p>
          </div>
        </div>
        {/* <button>
          <Link href="/experts">Explore more...</Link>
        </button> */}
      </div>
    </>
  );
};

export default TrendingCategories;
