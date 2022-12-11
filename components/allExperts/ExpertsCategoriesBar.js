import React, { useState, useEffect } from "react";
import styles from "../../styles/allExpertsStyles/ExpertsCategoriesBar.module.css";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faBars } from "@fortawesome/free-solid-svg-icons";

const ExpertsCategoriesBar = () => {
  const router = useRouter();
  const [{ activeCategory, user, mobileViewShowDashboard }, dispatch] =
    useStateValue();

  return (
    <div
      className={`${styles["category__bar__wrapper"]} ${
        mobileViewShowDashboard && styles["mobileView__category__bar__wrapper"]
      }`}
    >
      {user?.userType == "user" && (
        <>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "All",
              });
              dispatch({
                type: "SET_SEARCH_EXPERT_TEXT",
                searchExpertText: "",
              });
              router.push("/experts");
            }}
            className={
              activeCategory == "All"
                ? styles.category__menu__active
                : styles.category__menu
            }
          >
            <p>All Experts</p>
          </div>
          <h4>Categories</h4>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "Consulting",
              });
              dispatch({
                type: "SET_SEARCH_EXPERT_TEXT",
                searchExpertText: "",
              });
              router.push("/experts");
            }}
            className={
              activeCategory == "Consulting"
                ? styles.category__menu__active
                : styles.category__menu
            }
          >
            <p>Consulting</p>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "O1 Visa And EB GreenCard",
              });
              dispatch({
                type: "SET_SEARCH_EXPERT_TEXT",
                searchExpertText: "",
              });
            }}
            className={
              activeCategory == "O1 Visa And EB GreenCard"
                ? styles.category__menu__active
                : styles.category__menu
            }
          >
            <p>O1 Visa And EB GreenCard</p>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "Resumes And Interviews",
              });
              dispatch({
                type: "SET_SEARCH_EXPERT_TEXT",
                searchExpertText: "",
              });
              router.push("/experts");
            }}
            className={
              activeCategory == "Resumes And Interviews"
                ? styles.category__menu__active
                : styles.category__menu
            }
          >
            <p>Resumes And Interviews</p>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE_CATEGORY",
                activeCategory: "Speciality Topics",
              });
              dispatch({
                type: "SET_SEARCH_EXPERT_TEXT",
                searchExpertText: "",
              });
              router.push("/experts");
            }}
            className={
              activeCategory == "Speciality Topics"
                ? styles.category__menu__active
                : styles.category__menu
            }
          >
            <p>Speciality Topics</p>
          </div>
        </>
      )}

      <h4>Appointments</h4>
      {user?.userType == "user" && (
        <div
          onClick={() => {
            dispatch({
              type: "SET_ACTIVE_CATEGORY",
              activeCategory: "Pending Appointment",
            });
            router.push("/pending-appointments");
          }}
          className={
            activeCategory == "Pending Appointment"
              ? styles.category__menu__active
              : styles.category__menu
          }
        >
          <p>Pending Appointments</p>
        </div>
      )}

      <div
        onClick={() => {
          dispatch({
            type: "SET_ACTIVE_CATEGORY",
            activeCategory: "Ongoing Appointment",
          });
          router.push("/ongoing-appointment");
        }}
        className={
          activeCategory == "Ongoing Appointment"
            ? styles.category__menu__active
            : styles.category__menu
        }
      >
        <p>Ongoing Appointment</p>
      </div>
      <div
        onClick={() => {
          dispatch({
            type: "SET_ACTIVE_CATEGORY",
            activeCategory: "Upcoming Appointments",
          });
          router.push("/upcoming-appointments");
        }}
        className={
          activeCategory == "Upcoming Appointments"
            ? styles.category__menu__active
            : styles.category__menu
        }
      >
        <p>Upcoming Appointments</p>
      </div>
      <div
        onClick={() => {
          dispatch({
            type: "SET_ACTIVE_CATEGORY",
            activeCategory: "Completed Appointments",
          });
          router.push("/completed-appointments");
        }}
        className={
          activeCategory == "Completed Appointments"
            ? styles.category__menu__active
            : styles.category__menu
        }
      >
        <p>Completed Appointments</p>
      </div>
    </div>
  );
};

export default ExpertsCategoriesBar;
