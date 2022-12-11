import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
// import "./BookAppTimeSlots.css";
// import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { bookAppointmentAction } from "../../Actions/bookAppointmentAction";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";
import styles from "../../styles/allExpertsStyles/BookAppointment.module.css";
import StripeCheckout from "react-stripe-checkout";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import CurrencyFormat from "react-currency-format";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

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
  const bookAppointment = (e) => {
    e.preventDefault();
    let errrors = {};
    if (description === "") {
      errrors.description = "required";
    }
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
      };
      bookAppointmentAction(bookAppointmentValues, router);
    }
  };
  /**************************** */
  // const [clientSecret, setClientSecret] = useState();
  // useEffect(() => {
  //   api
  //     .get("/payment/create-payment-intent")
  //     .then((res) => {
  //       if (res.data) {
  //         console.log(
  //           "response fromm server creating payment intent",
  //           res.data
  //         );
  //         setClientSecret(res.data?.clientSecret);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // let stripePromise = loadStripe(
  //   "pk_test_51MD3nmH3RSV9Ih5PIzMeglB4FarnK3R4ymhfHbQ1fYOYvcVQeLEp9fkwggUhJ4vKrgD0IvtNehVc1mPc230tFsrc00uQCVAq6X"
  // );
  // let stripeOptions = {
  //   clientSecret,
  //   appearence: {
  //     theme: "stripe",
  //   },
  // };
  // const [product, setProduct] = useState({
  //   name: appointment.title,
  //   price: appointment.lawyer.appointmentFee,
  //   productBy: appointment.lawyer.name,
  // });
  // const makePayment = (token) => {
  //   const body = {
  //     token,
  //     product,
  //   };
  //   api
  //     .post("/payment", body)
  //     .then((response) => {
  //       console.log("response ", response);

  //       // const { status } = response;
  //       // console.log("Status ", status);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Fee Payment Failed, Try again later.",
  //         footer: "Try Again Later",
  //       });
  //     });
  // };
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
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && (
        <p className={styles.error__para}>{errors.description}</p>
      )}
      <button onClick={(e) => bookAppointment(e)}>Book Appointment</button>
      {/* <Elements options={stripeOptions} stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}
      {/* <StripeCheckout
        stripeKey={
          "pk_test_51MD3nmH3RSV9Ih5PIzMeglB4FarnK3R4ymhfHbQ1fYOYvcVQeLEp9fkwggUhJ4vKrgD0IvtNehVc1mPc230tFsrc00uQCVAq6X"
        }
        token={makePayment}
        name={appointment.title}
        amount={appointment.lawyer.appointmentFee * 100}
        // shippingAddress
        // billingAddress
      >
        <button className="purchase__btn">Pay Appointment Fee</button>
      </StripeCheckout> */}
    </div>
  );
};
export default BookAppointmentModal;
