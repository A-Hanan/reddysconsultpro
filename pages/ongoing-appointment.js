import ApplicationLayout from "../components/ApplicationLayout";
import styles from "../styles/allExpertsStyles/OngoingAppointment.module.css";
import React, { useState, useEffect } from "react";
import { getOngoingAppointment } from "../Actions/appointmentActions";
import { useStateValue } from "../StateProvider";
import OngoingAppointmentContainer from "../components/allExperts/OngoingAppointmentContainer";
import Image from "next/image";

const OngoingAppointment = () => {
  const [{ user }, dispatch] = useStateValue();
  const [appointment, setAppointment] = useState({});
  // const userstate = useSelector((state) => state.loginUserReducer);
  // const { user } = userstate;
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
    const getAndSet = async () => {
      let response = await getOngoingAppointment(user);
      if (response) {
        setAppointment(response);
        console.log("ongoing appointment>>", response);
      } else {
        console.log("error while fetching appoitments", response);
      }
    };
    getAndSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <ApplicationLayout>
      <div className={styles.ongoing__appointment__wrapper}>
        <div className="ongoing__appointment">
          {appointment?._id ? (
            <>
              <h1 style={{ textAlign: "center" }} className="heading">
                Ongoing Appointment
              </h1>

              <OngoingAppointmentContainer appointment={appointment} />
            </>
          ) : (
            <h1 className="appointments__not__found__info">
              {" "}
              No Ongoing Appointment
            </h1>
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default OngoingAppointment;
