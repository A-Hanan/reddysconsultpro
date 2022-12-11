import React, { useState, useEffect } from "react";
import styles from "../../styles/allExpertsStyles/ExpertsContainer.module.css";
import ExpertBox from "./ExpertBox";
import api from "../../utils/api";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";
const ExpertsContainer = () => {
  const router = useRouter();
  const [{ activeCategory, searchExpertText }, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState("");
  const submitSearch = () => {
    console.log("search text", searchText);
    if (searchText?.length > 0) {
      dispatch({
        type: "SET_SEARCH_EXPERT_TEXT",
        searchExpertText: searchText,
      });
      router.push("/experts");
    }

    setSearchText("");
  };
  const [allExperts, setAllExperts] = useState([]);
  const [expertsShown, setExpertsShown] = useState([]);
  useEffect(() => {
    api
      .get("/experts")
      .then((res) => {
        console.log("response from experts", res.data);
        setAllExperts(res.data);
        // setExpertsShown(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log("runnig use effect", searchExpertText);
    let array = allExperts?.filter((exp) => exp?.category == activeCategory);
    if (activeCategory == "All") {
      setExpertsShown(allExperts);
      array = allExperts;
    }

    if (searchExpertText?.length > 0) {
      console.log("running 2", array);
      array = array?.filter((exp) => {
        console.log("exp", exp);

        if (
          exp?.name?.toLowerCase()?.includes(searchExpertText?.toLowerCase()) ||
          exp?.category
            ?.toLowerCase()
            ?.includes(searchExpertText?.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    setExpertsShown(array);
  }, [activeCategory, allExperts, searchExpertText]);

  return (
    <div className={styles.experts__container}>
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
        <button onClick={() => submitSearch()}>Search</button>
      </div>
      <h1>
        <>{activeCategory} Experts</>
      </h1>
      <h3>
        {searchExpertText?.length > 0 && <>Searched Term: {searchExpertText}</>}
      </h3>
      <div className={styles.all__experts__wrapper}>
        {expertsShown?.length > 0 ? (
          expertsShown?.map((expert) => <ExpertBox expert={expert} />)
        ) : (
          <h1>No Experts Found.</h1>
        )}
      </div>
    </div>
  );
};

export default ExpertsContainer;
