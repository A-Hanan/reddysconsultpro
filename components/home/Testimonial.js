import React from "react";
import styles from "../../styles/homeStyles/Testimonials.module.css";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "better-react-carousel";
import { useRouter } from "next/router";

const Testimonial = () => {
  const router = useRouter();
  return (
    <div className={styles.testimonials__part__wrapper}>
      <div className={styles.testimonials__boxes}>
        <h1>User Testimonials</h1>
        <Carousel
          // cols={3}
          rows={1}
          gap={1}
          loop
          cols={1}
          autoplay={3000}
          responsiveLayout={[
            {
              breakpoint: 768,
              cols: 1,
              rows: 1,
              gap: 30,
              loop: true,
              autoplay: 3000,
            },
          ]}
        >
          <Carousel.Item>
            <div className={styles.testimonial__box}>
              <span className={styles.left__icon}>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              {/* <span className={styles.right__icon}>
                <FontAwesomeIcon icon={faQuoteRight} />
              </span> */}
              <h1>John Doe</h1>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles.testimonial__box}>
              <span className={styles.left__icon}>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              <p>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. */}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident
              </p>
              <h1>Nancy Pie</h1>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles.testimonial__box}>
              <span className={styles.left__icon}>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident
                {/* Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum. */}
              </p>
              <h1>Lisa Aed</h1>
            </div>
          </Carousel.Item>

          {/* ... */}
        </Carousel>
      </div>
      <div className={styles.user__options__wrapper}>
        <div>
          {/* <div className={styles.options__box__two}>
              <span>
                <FontAwesomeIcon icon={faPerson} />
              </span>
            </div>
            <div>
              <h1> Experts Online Now</h1>
              <p> Instant Video Consultation with Top Experts </p>
              <button className={styles.user__option__button__two}>
                Start Consuting
              </button>
            </div> */}

          <div className={styles.options__box__one}>
            <span>
              <FontAwesomeIcon icon={faVideo} />
            </span>
          </div>
          <div>
            <h1> Consultant Pro</h1>
            <p> Video Consultations with Top Experts in USD 20 </p>
            <button
              className={styles.user__option__button__one}
              onClick={() => router.push("/experts")}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
