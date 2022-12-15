// import Navbar from "../components/home/Navbar";
import ExpertsCategoriesBar from "./allExperts/ExpertsCategoriesBar";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "./home/Navbar";
import { useStateValue } from "../StateProvider";
import { SocketContext } from "../SocketContext";

export default function ApplicationLayout({ children }) {
  const [{ activeCategory }, dispatch] = useStateValue();
  const { addUser, me, callEnded, leaveCall, setMe } =
    useContext(SocketContext);
  useEffect(() => {
    let User = localStorage?.getItem("consult_pro_user")
      ? JSON.parse(localStorage?.getItem("consult_pro_user"))
      : null;
    dispatch({
      type: "SET_USER",
      user: User ? User : null,
    });
    User && addUser(User?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="all__experts__page">
        <div className="wrapper">
          <ExpertsCategoriesBar />
          {children}
        </div>
      </div>
    </div>
  );
}
