import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

import api from "../../utils/api";

import { cancelAppointment } from "../../Actions/appointmentActions2";
import { useStateValue } from "../../StateProvider";
// import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/allExpertsStyles/CompletedAppointments.module.css";
import Image from "next/image";

const PendingAppointment = ({ appointment }) => {
  const [showPurchaseModel, setShowPurchaseModel] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  //   const userstate = useSelector((state) => state.loginUserReducer);
  //   const { currentUser } = userstate;
  const [{ user }, dispatch] = useStateValue();
  //   const router.push = userouter.push();
  const router = useRouter();

  const [product, setProduct] = useState({
    name: appointment?.title,
    price: appointment.expert?.minFee,
    productBy: appointment.expert?.name,
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    api
      .post("/payment", body)
      .then((response) => {
        console.log("response ", response);
        api
          .put(`/appointment/confirm-appointment/${appointment._id}`)
          .then((res) => {
            if (res.data) {
              console.log("updated appointments", res.data);
              let app = res.data;
              api
                .post("/auth/send-booked-appointment-success-email", {
                  appointment: res?.data,
                })
                .then((res2) => {
                  console.log(
                    "response from sending booked appointment mail",
                    res2.data
                  );
                  Swal.fire("Your Appointment is Confirmed!", "", "success");
                  router.push("/upcoming-appointments");
                })
                .catch((err) => console.log(err));
              //   alert("appointment confirmed");
            }
          })
          .catch((err) => console.log(err));
        // const { status } = response;
        // console.log("Status ", status);
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fee Payment Failed, Try again later.",
          footer: "Try Again Later",
        });
      });
  };
  const confirm = () => {
    api
      .put(`/appointment/confirm-appointment/${appointment._id}`)
      .then((res) => {
        if (res.data) {
          console.log("updated appointments", res.data);

          //  alert("appointment confirmed");
          Swal.fire("Appointment Confirmed!", "Check it", "success");
          router.push("/dashboard/upcoming__appointments");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className={`${styles["attended__appointment"]} ${styles["pending__appointment"]}`}
      >
        <div className={styles.row__one}>
          <div className={styles.lawyer__info}>
            <Image
              src={
                appointment.expert.profile
                  ? appointment.expert.profile
                  : "https://www.unhcr.org/innovation/wp-content/uploads/2015/04/gellman.png"
              }
              width={20}
              height={20}
              alt="profile"
            />
            <h3>{appointment.expert.name}</h3>
          </div>
          <div className={styles.appointment__info}>
            <span className={styles.label}>Appointment Title </span>
            <h6>{appointment.title}</h6>
            <span className={styles.label}>Description</span>
            <h6>{appointment.description}</h6>
            <span className={styles.label}>Date</span>
            <h6>{appointment.appointmentDate}</h6>
            <span className={styles.label}>Time</span>
            <h6>{appointment.appointmentTime}</h6>
          </div>
        </div>

        <div className={styles.row__two}>
          <div>
            <div className={styles.stripe__container}>
              {/* <button
                className={styles.purchase__btn"
                onClick={() => setShowPaymentModal(true)}
              >
                Pay Appointment Fee
              </button> */}
              <StripeCheckout
                stripeKey={
                  "pk_test_51MD3nmH3RSV9Ih5PIzMeglB4FarnK3R4ymhfHbQ1fYOYvcVQeLEp9fkwggUhJ4vKrgD0IvtNehVc1mPc230tFsrc00uQCVAq6X"
                }
                token={makePayment}
                name={appointment.title}
                amount={appointment.expert.appointmentFee * 100}
                // shippingAddress
                // billingAddress
              >
                <button className={styles.purchase__btn}>
                  Pay Appointment Fee
                </button>
              </StripeCheckout>
            </div>
            <buton
              onClick={() => cancelAppointment(appointment._id, router)}
              style={{
                background: "red",
                padding: "4px 7px",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel Appointment
            </buton>
          </div>
        </div>

        {showPaymentModal && (
          <div className={styles.payment__modal}>
            <h3 className={styles.label}>Appointment Fee</h3>
            <h3 className={styles.label}>
              {appointment.expert.appointmentFee}
            </h3>
            <h3 className={styles.label}>Bank</h3>
            <h3 className={styles.label}>
              {appointment.expert?.bankAccountDetails?.bank}
            </h3>
            <h3 className={styles.label}>Account No.</h3>
            <h3 className={styles.label}>
              {appointment.expert?.bankAccountDetails?.bankAccount}
            </h3>
            <br />
            <h3 className={styles.label}>Have you Paid?</h3>
            <div className={styles.stripe__container}>
              <button
                className={styles.purchase__btn}
                onClick={() => confirm()}
              >
                Yes
              </button>
              &nbsp;&nbsp;
              <button
                className={styles.purchase__btn}
                onClick={() => setShowPaymentModal(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PendingAppointment;

// <div className={styles.pending__appointment">
//   <div className={styles.expert__info">
//     <img
//       src={
//         appointment.expert.profile
//           ? appointment.expert.profile
//           : "https://www.unhcr.org/innovation/wp-content/uploads/2015/04/gellman.png"
//       }
//     />
//     <h3>{appointment.expert.name}</h3>
//     <h4>(expert)</h4>
//     <div className={styles.options">

//       <IconButton
//         onClick={() => cancelAppointment(appointment._id, navigate)}
//       >
//         <Link to="#">
//           <ClearIcon />
//         </Link>
//       </IconButton>
//       <IconButton>
//         {" "}
//         <Link to={`/edit-appointment/${appointment._id}`}>
//           <EditIcon />
//         </Link>
//       </IconButton>
//     </div>
//   </div>
//   <div className={styles.appointment__info">
//     <span className={styles.label">Appointment Title </span>
//     <h6>{appointment.title}</h6>
//     <span className={styles.label">Description</span>
//     <h6>{appointment.description}</h6>
//     <span className={styles.label">Appointment Date </span>
//     <h6>{new Date(appointment.appointmentDate).toDateString()}</h6>
//     <span className={styles.label">Appointment Time </span>
//     <h6>{appointment.appointmentTime}</h6>
//     <span className={styles.label">Status </span>
//     <h6>Pending</h6>
//   </div>
//   <div className={styles.pay__fee ">
//     <div className={styles.stripe__container">
//       <button
//         className={styles.purchase__btn"
//         onClick={() => setShowPaymentModal(true)}
//       >
//         Pay Appointment Fee
//       </button>
{
  /* <StripeCheckout
            stripeKey={
              "pk_test_51KWmfGCB2vzWo8QiaYkjGd3W4IGK3NNm2HtbmwuKIE1SLlwoMYnW4cy7QrvsoCOIZPHDTwJzewpDKA0FIgyWBiqT00u5CfS14C"
            }
            token={makePayment}
            name={appointment.title}
            amount={appointment.expert.appointmentFee * 100}
            // shippingAddress
            // billingAddress
          >
            <button className={styles.purchase__btn">Pay Appointment Fee</button>
          </StripeCheckout> */
}
//     </div>
//   </div>
//   {showPaymentModal && (
//     <div className={styles.payment__modal">
//       <h3 className={styles.label">Appointment Fee</h3>
//       <h3 className={styles.label">{appointment.expert.appointmentFee}</h3>
//       <h3 className={styles.label">Bank</h3>
//       <h3 className={styles.label">
//         {appointment.expert?.bankAccountDetails?.bank}
//       </h3>
//       <h3 className={styles.label">Account No.</h3>
//       <h3 className={styles.label">
//         {appointment.expert?.bankAccountDetails?.bankAccount}
//       </h3>
//       <br />
//       <h3 className={styles.label">Have you Paid?</h3>
//       <div className={styles.stripe__container">
//         <button className={styles.purchase__btn" onClick={() => confirm()}>
//           Yes
//         </button>
//         &nbsp;&nbsp;
//         <button
//           className={styles.purchase__btn"
//           onClick={() => setShowPaymentModal(false)}
//         >
//           No
//         </button>
//       </div>
//     </div>
//   )}
// </div>
