import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
// import { Link } from "react-router-dom";
// import VideocamIcon from "@mui/icons-material/Videocam";
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
                ? "https://www.unhcr.org/innovation/wp-content/uploads/2015/04/gellman.png"
                : appointment.expert.profile
                ? appointment.expert.profile
                : "https://www.unhcr.org/innovation/wp-content/uploads/2015/04/gellman.png"
            }
            width={20}
            height={20}
            alt='profile'
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
          {/* <Link
            className={styles.start__video__btn"
            onClick={() => {
              window.location.href = `/video-chat/${appointment._id}`;
            }}
            href="#"
          > */}
          {/* <CallIcon />
          {user.userRole === "1" ? "Call the Doctor " : " Call the Patient"} */}
          {/* <VideocamIcon /> */}
          {/* Join
          </Link> */}
          {/* <button
          className={styles.start__video__btn"
          onClick={() => setShowVideoBox(true)}
        >
          <CallIcon />
          {user.userRole === "1" ? "Call the Doctor " : " Call the Patient"}
        </button> */}
          {/* {callAccepted && !callEnded ? (
          <button
            className={styles.start__video__btn"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={leaveCall}
          >
            Hang Up
          </button>
        ) : (
          <button
            className={styles.start__video__btn"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              callUser(user.userRole === "1" ? doctor?._id : patient?._id)
            }
          >
            Call
          </button> */}
          {/* )} */}
          {/* //<Notifications /> */}
          {/* <Sidebar
          personToCallId={user.userRole === "1" ? doctor?._id : patient?._id}
        >
          <Notifications />
        </Sidebar>
        {showVideoBox && (
          // <div className={styles.video-chat-container">
          // <div>
          //   <CancelIcon onClick={() => setShowVideoBox(false)} />
          <VideoPlayer />
          // </div>
          // </div>
        )} */}
        </div>
      </div>
    </>
  );
};

export default OngoingAppointmentContainer;
