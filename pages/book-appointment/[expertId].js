import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import StarIcon from "@mui/icons-material/Star";
import Reviews from "../../components/allExperts/Reviews";
import BookApptimeSlots from "../../components/allExperts/BookAppTimeSlots";
import { useRouter } from "next/router";
import { useStateValue } from "../../StateProvider";
import ApplicationLayout from "../../components/ApplicationLayout";
// import Navbar from "../Home/Navbar";
import styles from "../../styles/allExpertsStyles/BookAppointment.module.css";
import Image from "next/image";

const BookAppointment3 = () => {
  const router = useRouter();
  console.log();

  const [expert, setExpert] = useState({});
  const [{ user, activeCategory }, dispatch] = useStateValue();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);

  useEffect(() => {
    const expertId = router?.query?.expertId;
    // console.log("router query", router.query);
    // console.log("expertId", expertId);
    if (router?.isReady) {
      api
        .get(`/experts/getExpertById/${expertId}`)
        .then((res) => {
          setExpert(res.data);
          // console.log("expert", res.data);
        })
        .catch((error) => console.error(error));
    }

    //setting reviews
    api
      .get(`/review/all-reviews/${expertId}`)
      .then((res) => {
        console.log("res.data", res.data);
        if (res.data.length > 0) {
          let reviews = res.data;
          let count = 0;
          let total = 0;
          let array = [];
          reviews.forEach((review) => {
            count++;
            total = total + review.rating;
            array.push(review);
          });
          let ratingTemp = parseInt(total / count);
          setRating(ratingTemp);
          setRatingCount(count);
          setReviews(array);
          let satRate = (ratingTemp * 100) / 5;
          setSatisfactionRate(satRate);
        }
      })
      .catch((err) => console.log(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <ApplicationLayout>
      <div className={styles.book__appointment__container}>
        <div className={styles.basic__expert__info}>
          <div>
            <div className={styles.image__box}>
              {expert?.profile ? (
                <Image
                  className={styles.image__of__expert}
                  src={expert?.profile}
                  alt="face"
                  width={150}
                  height={150}
                />
              ) : (
                <h5>{expert?.name?.at(0)} </h5>
              )}
            </div>

            <h1>
              {expert?.name}{" "}
              <span>
                <Image
                  src="/images/linkedInLogo.png"
                  alt="linkedinlogo"
                  width={20}
                  height={20}
                />
              </span>
            </h1>
          </div>
          <div>
            <p>${expert?.minFee}/min</p>
            <p>{expert?.category}</p>

            <div className={styles.footer__of__expert__basic__info}>
              <div>
                <h6>{reviews?.length}</h6>
                <p>Client Reviews</p>
              </div>
              <div>
                <h6>{satisfactionRate}%</h6>
                <p>satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
        <h4>Book Your Appointment</h4>
        <div className="book__appointment__time__slots__container">
          <BookApptimeSlots expert={expert} />
        </div>
        <div className="reviews__container">
          <Reviews reviews={reviews} />
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default BookAppointment3;
