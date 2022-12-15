import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraWeb } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/allExpertsStyles/OngoingAppointment.module.css";
import Image from "next/image";

const OngoingAppointmentContainer = ({ appointment }) => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      <div className={styles.ongoing__appointment__container}>
        <div className={styles.user__info}>
          <Image
            className={styles.user__profile__img}
            src={
              user.userType === "user"
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAt16FjI60ZX7mbnNiMTSiGiWXelr3NFehw&usqp=CAU"
                : appointment.expert.profile
                ? appointment.expert.profile
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAt16FjI60ZX7mbnNiMTSiGiWXelr3NFehw&usqp=CAU"
            }
            width={70}
            height={70}
            alt="profile"
          />
          <h1>{user.userType === "expert" ? "Client" : "Expert"}</h1>
          <div className={styles.user__name}>
            {/* <span>Name: </span> */}
            <span>
              {user.userType === "expert"
                ? appointment.user?.firstName + " " + appointment.user?.lastName
                : appointment.expert?.name}
            </span>
          </div>
          <div className={styles.user__name}>
            {/* <span>Email: </span> */}
            <span>
              {user.userType === "expert"
                ? appointment.user?.email
                : appointment.expert?.email}
            </span>
          </div>
        </div>
        <div className={styles.video__call__settings}>
          <div className={styles.appointment__details}>
            <h1>Appointment Details</h1>
            <div className={styles.appointment__title}>
              <span className={styles.label}>Title: </span>
              <span className={styles.text}>{appointment.title}</span>
            </div>
            <div className={styles.appointment__title}>
              <span className={styles.label}>description: </span>
              <span className={styles.text}>{appointment.description}</span>
            </div>
          </div>
          <div
            className={styles.join__meeting__btn}
            onClick={() => {
              window.location.href = `/video-chat/${appointment._id}`;
            }}
          >
            <FontAwesomeIcon icon={faCameraWeb} />
            Join Meeting
          </div>
        </div>
      </div>
    </>
  );
};

export default OngoingAppointmentContainer;
