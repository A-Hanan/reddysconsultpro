import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
// import "./BookAppTimeSlots.css";
// import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookAppointmentAction } from "../../Actions/bookAppointmentAction";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";
import styles from "../../styles/allExpertsStyles/BookAppointment.module.css";
import StripeCheckout from "react-stripe-checkout";

const BookAppointmentModal = ({
  date,
  time,
  expert,
  setShowModal,
  currentUser,
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    let t1 =
      expert?.category?.split(" ")[0] == "O1"
        ? expert?.category?.split(" ")[1]
        : expert?.category?.split(" ")[0];
    let t2 = expert?.name?.split(" ")[0];
    let t3 = currentUser?.firstName;
    setTitle(t1 + " " + t2 + "-" + t3 + " 30 minutes");
  }, [expert]);
  const bookAppointment = (e) => {
    e.preventDefault();
    let errrors = {};
    // if (description === "") {
    //   errrors.description = "required";
    // }
    if (title === "") {
      errrors.title = "required";
    }
    if (Object.keys(errrors).length === 0 && errrors.constructor === Object) {
      // alert("log in");
      date.setHours(0, 0, 0, 0);
      const bookAppointmentValues = {
        title,
        description,
        appointmentDate: date,
        appointmentTime: time,
        userId: currentUser?.id,
        expertId: expert?._id,
        user: currentUser,
        expert: expert,
        status: expert?.minFee > 0 ? "Pending" : "Confirmed",
      };
      bookAppointmentAction(bookAppointmentValues, router);
    }
  };

  return (
    <div className={styles.book__appointment__modal}>
      <span onClick={() => setShowModal(false)}>
        {/* <HighlightOffIcon /> */}
        <FontAwesomeIcon icon={faXmark} />
      </span>
      <h1>Appointment with {expert?.name}</h1>
      <label>Appointment Date: {date?.toLocaleDateString()}</label>
      <label>Appointment Time: {time}</label>
      <label>Appointment Fee : ${expert?.minFee}</label>
      <label>Appointment Title</label>
      <input
        type="text"
        defaultValue={title}
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className={styles.error__para}>{errors.title}</p>}

      <label className={styles.label}>Appointment Description</label>
      <input
        type="text"
        defaultValue={description}
        name="description"
        required
        placeholder="(optional)"
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && (
        <p className={styles.error__para}>{errors.description}</p>
      )}
      <button onClick={(e) => bookAppointment(e)}>Book Appointment</button>
    </div>
  );
};
export default BookAppointmentModal;
