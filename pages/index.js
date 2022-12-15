import styles from "../styles/homeStyles/Home.module.css";
import React, { useState, useEffect } from "react";
import Navbar from "../components/home/Navbar";
import HeroContainer from "../components/home/HeroContainer";
import TrendingCategories from "../components/home/TrendingCategories";
import TopRatedExperts from "../components/home/TopRatedExperts";
import LookingForMore from "../components/home/LookingForMore";
import GuideForBooking from "../components/home/GuideForBooking";
import Footer from "../components/home/Footer";
import Testimonial from "../components/home/Testimonial";
import { useStateValue } from "../StateProvider";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  const [{ activeCategory, user }, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: "SET_SEARCH_EXPERT_TEXT",
      searchExpertText: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let User = localStorage?.getItem("consult_pro_user")
      ? JSON.parse(localStorage?.getItem("consult_pro_user"))
      : null;
    dispatch({
      type: "SET_USER",
      user: User ? User : null,
    });
    if (User?.userType == "expert") {
      router.push("/upcoming-appointments");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar />
      <div className="home__page">
        <HeroContainer />
        <TrendingCategories />
        <Testimonial />

        {/* <TopRatedExperts /> */}

        <GuideForBooking />
        <LookingForMore />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
