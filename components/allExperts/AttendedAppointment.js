import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import RatingAndReview from "./RatingAndReview";
import api from "../../utils/api";
import { useRouter } from "next/router";
import styles from "../../styles/allExpertsStyles/CompletedAppointments.module.css";
const AttendedAppointment = ({ appointment, user }) => {
  //   const navigate = useNavigate();
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  useEffect(() => {
    console.log("is Reviewed>", appointment.isReviewed);
    if (appointment?.isReviewed) {
      api
        .get(`/review/${appointment._id}`)
        .then((res) => {
          // console.log("get reviews", res.data);
          setRating(res?.data?.rating);
          setReview(res?.data?.review);
        })
        .catch((err) => alert(err.message));
    }
  }, []);
  return (
    <div className={styles.attended__appointment}>
      <div className={styles.row__one}>
        <div className={styles.lawyer__info}>
          <img
            src={
              user.userType == "expert"
                ? appointment.expert.profile
                  ? appointment.expert.profile
                  : "https://www.unhcr.org/innovation/wp-content/uploads/2015/04/gellman.png"
                : appointment.user.profile
                ? appointment.user.profile
                : "https://www.unhcr.org/innovation/wp-content/uploads/2015/04/gellman.png"
            }
          />
          <h3>
            {user.userType == "user"
              ? appointment.expert.name
              : appointment.user.firstName + " " + appointment.user.lastName}
          </h3>
          {/* <h5>
                    {user?.userType == "user"
                      ? "(expert)"
                      : "(user)"}
                  </h5> */}
        </div>
        <div className={styles.appointment__info}>
          <span className={styles.label}>Appointment Title </span>
          <h6>{appointment.title}</h6>
          <span className={styles.label}>Description</span>
          <h6>{appointment.description}</h6>
        </div>
      </div>

      <div className={styles.row__two}>
        {/* <div>
          <span className={styles.label}>Video Duration : 25 minutes </span>
        </div> */}
        <div>
          <span className={styles.label}>
            Attended on{" "}
            {appointment?.appointmentDate &&
              new Date(appointment?.appointmentDate).toDateString()}
          </span>
        </div>
      </div>
      <div className={styles.row__three}>
        <div className={styles.review__box}>
          {user.userType == "expert" ? (
            <>
              <h1>User Rating</h1>
              <div className={styles.rating}>
                {rating ? (
                  <>
                    <>
                      {" "}
                      {Array(rating)
                        .fill()
                        .map((_, i) => (
                          <span>
                            <StarIcon />
                          </span>
                        ))}
                      <span>({rating})</span>
                    </>

                    <h1 style={{ marginTop: "1.2vh" }}>{review}</h1>
                  </>
                ) : (
                  <p>not rated yet</p>
                )}
              </div>
              <br />

              {/* <h1>Review</h1>
              {review ? <p>{review}</p> : <p>no review given</p>} */}
            </>
          ) : (
            <div>
              {" "}
              {appointment.isReviewed == true ? (
                <h1>Review Given.</h1>
              ) : (
                <button
                  className={styles.rating__btn}
                  onClick={() => setShowRatingModal(true)}
                >
                  {console.log("reveiw given>>> ", appointment.isReviewed)}
                  Give a review!
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showRatingModal && (
        <RatingAndReview
          setShowRatingModal={setShowRatingModal}
          appointment={appointment}
        />
      )}
    </div>
  );
};

export default AttendedAppointment;
