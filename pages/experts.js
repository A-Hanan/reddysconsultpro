import React, { useState, useEffect } from "react";
// import Navbar from "../components/home/Navbar";
import ExpertsCategoriesBar from "../components/allExperts/ExpertsCategoriesBar";
import ExpertsContainer from "../components/allExperts/ExpertsContainer";
import ApplicationLayout from "../components/ApplicationLayout";

const experts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <ApplicationLayout>
      <ExpertsContainer activeCategory={activeCategory} />
    </ApplicationLayout>
  );
};

export default experts;
