import React, { useState, useEffect } from "react";
import styles from "../../styles/homeStyles/HeroSection.module.css";
import Image from "next/image";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";
import Link from "next/link";

const HeroContainer = () => {
  const router = useRouter();
  const [{ activeCategory }, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState("");
  const submitSearch = () => {
    console.log("search text", searchText);
    if (searchText?.length > 0) {
      dispatch({
        type: "SET_SEARCH_EXPERT_TEXT",
        searchExpertText: searchText,
      });
      // router.push("/experts");
    }

    setSearchText("");
  };

  const [subheaderText, setSubheaderText] = useState(
    "15 thousand+ users served"
  );
  const [subheaderTextCount, setCount] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      console.log("runnng");
      if (subheaderTextCount == 1) {
        setCount(2);
        setSubheaderText("2000+ Experts");
      }
      if (subheaderTextCount == 2) {
        setCount(3);
        setSubheaderText("6000+ User Reviews");
      }
      if (subheaderTextCount == 3) {
        setCount(1);
        setSubheaderText("15 thousand+ Users Served");
      }
    }, 5000);
  }, [subheaderTextCount]);
  return (
    <div className={styles.hero__container__wrapper}>
      <div className={styles.dark__layer}>
        <h1>
          Find and Book <span>best experts</span> of every field
        </h1>
        <div className={styles.search__input__wrapper}>
          <input
            placeholder="Search for experts in different fields by name or category"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            onKeyDown={(e) => {
              if (event.keyCode == 13) {
                submitSearch();
              }
            }}
          />

          <button onClick={() => submitSearch()}>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href="/experts"
            >
              Search{" "}
            </Link>
          </button>
        </div>
        <h3>{subheaderText}</h3>
      </div>
      <div className={styles.image__two}>
        <Image
          src="/images/vector 5.jpg"
          alt="vector"
          width={300}
          height={320}
        />
      </div>
      <div className={styles.image__three}>
        <Image
          src="/images/vector2.png"
          alt="vector"
          width={400}
          height={300}
        />
      </div>
      <div className={styles.image__one}>
        <Image
          src="/images/vector1.jpg"
          alt="vector"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default HeroContainer;
/**
 * <div className={styles.image__wrapper}>
        <Image
          src={heroImage}
          alt="Picture of the author"
          width="100%"
          height={500}
        />
      </div>
 */
