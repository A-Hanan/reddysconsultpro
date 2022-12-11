import React from "react";
// import "./Reviews.css";
import { format } from "timeago.js";
// import StarIcon from "@mui/icons-material/Star";
import StarIcon from "@mui/icons-material/Star";

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews">
      <div className="comment__box">
        <h1 className="heading">Reviews ({reviews?.length})</h1>

        <div className="comments">
          {reviews?.length > 0 ? (
            reviews.map((review, i) => (
              <div className="review" key={i}>
                <h4>{review?.review}</h4>
                <h4>
                  {Array(parseInt(review?.rating))
                    .fill()
                    .map((_, i) => (
                      <span key={i}>
                        {" "}
                        <StarIcon />
                      </span>
                    ))}
                  <span>({review?.rating})</span>
                </h4>
                <p>
                  By {review?.user?.firstName + " " + review?.user?.lastName}
                </p>
                <span>{format(review?.createdAt)}</span>
              </div>
            ))
          ) : (
            <h1>No reviews.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
