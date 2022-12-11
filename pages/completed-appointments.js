import ApplicationLayout from "../components/ApplicationLayout";
import styles from "../styles/allExpertsStyles/CompletedAppointments.module.css";
import React, { useState, useEffect } from "react";
import AttendedAppointment from "../components/allExperts/AttendedAppointment";
import { getAttendedAppointments } from "../Actions/appointmentActions";
// import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useStateValue } from "../StateProvider";

const CompletedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  // const userstate = useSelector((state) => state.loginUserReducer);
  // const { currentUser } = userstate;
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    let User = localStorage?.getItem("consult_pro_user")
      ? JSON.parse(localStorage?.getItem("consult_pro_user"))
      : null;
    dispatch({
      type: "SET_USER",
      user: User ? User : null,
    });
  }, []);

  useEffect(() => {
    const setAndRun = async () => {
      let response = await getAttendedAppointments(user?.id, user?.userType);
      if (response) {
        setAppointments(response);
        console.log("pendingAppointments>>", response);
      } else {
        alert("error while fetching appoitments");
      }
    };
    setAndRun();
  }, [user]);
  useEffect(() => {
    let User = localStorage?.getItem("consult_pro_user")
      ? JSON.parse(localStorage?.getItem("consult_pro_user"))
      : null;
    dispatch({
      type: "SET_USER",
      user: User ? User : null,
    });
  }, []);

  return (
    <ApplicationLayout>
      <div className={styles.completed__appointments__container}>
        {appointments.length > 0 ? (
          <>
            <h1 style={{ textAlign: "center" }} className={styles.heading}>
              Attended Appointments
            </h1>
            {appointments.map((appointment) => (
              <AttendedAppointment appointment={appointment} user={user} />
              // <h1>Appoint</h1>
            ))}
          </>
        ) : (
          <h1 className={styles.appointments__not__found__info}>
            {" "}
            No Attended Appointments
          </h1>
        )}
      </div>
    </ApplicationLayout>
  );
};

export default CompletedAppointments;
