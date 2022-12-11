import React from "react";
import styles from "../../styles/homeStyles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className={styles.footer__wrapper}>
      <div>
        <h1>
          Consult<span>Pro</span>
        </h1>
        <h6>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </h6>
      </div>
      <div className={styles.option__columns}>
        <div>
          <p>Find Expert</p>
          <p>Join as Expert</p>
          <p>Contact Us</p>
          <p>About Us</p>
        </div>
        <div>
         
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>FAQs</p>
        </div>
        <div>
        
          {/* <span>
            <FontAwesomeIcon icon={faFacebookF} />
          </span>
          <span>
            <FontAwesomeIcon icon={faInstagram} />
          </span>
          <span>
            <FontAwesomeIcon icon={faTwitter} />
          </span> */}
          {/* <p className={styles.last__para}>
            Copyright @ 2022 <span>Reddy Nithin</span> -All rights reserved
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
