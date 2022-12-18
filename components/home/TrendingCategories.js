import React, { useState, useEffect } from "react";
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
import api from "../../utils/api";

import Link from "next/link";

const TrendingCategories = () => {
  const router = useRouter();
  const [{ activeCategory }, dispatch] = useStateValue();
  const [expertsCount, setExpertCount] = useState({});
  useEffect(() => {
    api
      .get("/experts")
      .then((res) => {
        console.log("response from experts", res.data);
        let c1 = 0,
          c2 = 0,
          c3 = 0,
          c4 = 0;
        res?.data?.map((e) => {
          if (e?.category == "Consulting") {
            c1++;
          }
          if (e?.category == "O1 Visa And EB GreenCard") {
            c2++;
          }
          if (e?.category == "Resumes And Interviews") {
            c3++;
          }
          if (e?.category == "Speciality Topics") {
            c4++;
          }
        });
        setExpertCount({
          consulting: c1,
          visa: c2,
          resumes: c3,
          speciality: c4,
        });
        // setAllExperts(res.data);
        // setExpertsShown(res.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              {/* <FontAwesomeIcon icon={faUserGroup} /> */}
              <p>{expertsCount?.visa} Experts</p>
            </span>
            <p>
              {" "}
              {/* <FontAwesomeIcon icon={faPassport} /> */}
              O1 Visa and EB Green Card
            </p>
            <Image
              src="/images/iconPassportCategory.png"
              alt="vector"
              width={50}
              height={52}
            />
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
              {/* <FontAwesomeIcon icon={faUserGroup} /> <p>40 Experts</p> */}
              <p>{expertsCount?.resumes} Experts</p>
            </span>
            <p style={{ marginTop: "14px" }}>
              {" "}
              {/* <FontAwesomeIcon icon={faFile} /> */}
              Resumes and Interviews
            </p>
            <Image
              src="/images/iconResumeCategory.png"
              alt="vector"
              width={36}
              height={38}
            />
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
              {/* <FontAwesomeIcon icon={faUserGroup} /> */}
              <p>{expertsCount?.consulting} Experts</p>
            </span>
            <p style={{ marginTop: "14px" }}>
              {" "}
              {/* <FontAwesomeIcon icon={faUserGroup} /> */}
              Consulting
            </p>
            <Image
              src="/images/iconConsultingCategory.png"
              alt="vector"
              width={36}
              height={38}
            />
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
              {/* <FontAwesomeIcon icon={faUserGroup} /> */}
              <p>{expertsCount?.speciality} Experts</p>
            </span>
            <p style={{ marginTop: "14px" }}> Speciality Topics</p>
            <Image
              src="/images/iconSpecialCategory.png"
              alt="vector"
              width={36}
              height={38}
            />
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
