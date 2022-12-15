import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import styles from "../../styles/LoginStyles/EmailVerification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import EmailIcon from "@mui/icons-material/Email";

const VerifyEmail = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [path, setPath] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  useEffect(() => {
    if (userId) {
      api
        .get(`/auth/getuserById/${userId}`)
        .then((res) => {
          if (res.data.verified === true) {
            setIsAlreadyVerified(true);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* {loading && <Loading />} */}
      <div className={styles.verifyYourAccountWrapper}>
        <div>
          <h1>Verification Email Sent. Check that and verify your Account.</h1>

          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
