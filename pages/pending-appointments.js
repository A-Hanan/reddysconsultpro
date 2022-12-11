import React, { useState, useEffect } from "react";
import ApplicationLayout from "../components/ApplicationLayout";
import { getPendingAppointments } from "../Actions/appointmentActions";
import PendingAppointment from "../Components/allExperts/PendingAppointment";
import styles from "../styles/allExpertsStyles/CompletedAppointments.module.css";
import { useStateValue } from "../StateProvider";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    let User = localStorage?.getItem("consult_pro_user")
      ? JSON.parse(localStorage?.getItem("consult_pro_user"))
      : null;
    dispatch({
      type: "SET_USER",
      user: User ? User : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const setAndRun = async () => {
      let response = await getPendingAppointments();
      if (response) {
        setAppointments(response);
        console.log("pendingAppointments>>", response);
      } else {
        alert("error while fetching appoitments");
      }
    };
    setAndRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <ApplicationLayout>
      <div className={styles.completed__appointments__container}>
        {appointments.length > 0 ? (
          <>
            <h1 style={{ textAlign: "center" }} className="heading">
              Pending Appointments
            </h1>
            {appointments.map((appointment, i) => (
              <div key={i}>
                <PendingAppointment appointment={appointment} />
              </div>
            ))}
          </>
        ) : (
          <h1 className="appointments__not__found__info">
            {" "}
            No Pending Appointments
          </h1>
        )}
      </div>
    </ApplicationLayout>
  );
};

export default PendingAppointments;
