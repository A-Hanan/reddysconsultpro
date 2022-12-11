import React from "react";
import styles from "../../styles/homeStyles/TopRatedExperts.module.css";
import ExpertBox from "./ExpertBox";
import Carousel from "better-react-carousel"; //*https://reactjsexample.com/react-responsive-carousel-component-with-grid-layout-to-easily-create-a-carousel-like-photo-gallery/*/

const TopRatedExperts = () => {
  return (
    <div className={styles.top__rated__experts__wrapper}>
      <header>
        <h1>Top Rated Experts</h1>
        <p>Experts with exceptional services & client satisfaction</p>
      </header>
      <div className={styles.expert__boxes__wrapper}>
        <Carousel
          // cols={3}
          rows={1}
          gap={1}
          loop
          responsiveLayout={[
            {
              breakpoint: 8000,
              cols: 6,
              rows: 1,
              gap: 30,
              loop: true,
              autoplay: false,
            },
            {
              breakpoint: 2000,
              cols: 4,
              rows: 1,
              gap: 30,
              loop: true,
              autoplay: false,
            },
            {
              breakpoint: 1000,
              cols: 3,
              rows: 1,
              gap: 30,
              loop: true,
              autoplay: false,
            },
            {
              breakpoint: 600,
              cols: 2,
              rows: 1,
              gap: 30,
              loop: true,
              autoplay: false,
            },
          ]}
        >
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            <ExpertBox />
          </Carousel.Item>
          <Carousel.Item>
            {/* anything you want to show in the grid */}
          </Carousel.Item>
          {/* ... */}
        </Carousel>
      </div>
    </div>
  );
};

export default TopRatedExperts;
