import React, { useState, useEffect } from "react";
import styles from "../../styles/allExpertsStyles/ExpertBox.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "../../utils/api";
import StarIcon from "@mui/icons-material/Star";

const ExpertBox = ({ expert }) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  // console.log("image", manFace);
  useEffect(() => {
    //setting reviews
    api
      .get(`/review/all-reviews/${expert?._id}`)
      .then((res) => {
        console.log("expert id", expert?._id);
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
      .catch((err) => cosole.log(err));
  }, [expert]);
  return (
    <div className={styles.ExpertBox}>
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
          <h5>{expert?.name?.at(0)}</h5>
        )}
      </div>
      <span>
        <Image
          alt="image"
          src="/images/linkedInLogo.png"
          width={20}
          height={20}
        />
      </span>
      <h1>{expert?.name}</h1>
      <div className={styles?.rating__container}>
        {rating == 0 ? (
          <p style={{ marginLeft: "-15px" }}>not rated</p>
        ) : (
          // <></>
          <>
            {" "}
            {Array(parseInt(rating))
              .fill()
              .map((_, i) => (
                <span key={i}>
                  <StarIcon />
                </span>
              ))}
            {/* <span>({ratingCount})</span> */}
          </>
        )}
      </div>

      <p>${expert?.minFee}/min</p>
      <p>{expert?.category}</p>

      <Link href={"/book-appointment/" + expert?._id}>
        <button
        // onClick={() => router.push("/book-appointment/" + expert?._id)}
        >
          Book Now
        </button>
      </Link>

      <div className={styles.footer__of__expert__box}>
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
  );
};

export default ExpertBox;
