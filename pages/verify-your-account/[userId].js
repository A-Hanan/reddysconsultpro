import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import styles from "../../styles/LoginStyles/EmailVerification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import EmailIcon from "@mui/icons-material/Email";

const VerifyEmail = () => {
  const router = useRouter();
  //   const userstate = useSelector((state) => state.loginUserReducer);
  //   const { currentUser } = userstate;
  const { userId } = router.query;
  const [path, setPath] = useState("");
  // const { userId, uniqueString } = useParams();
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  // const [loading, showLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     showLoading(false);
  //   }, 1000);
  // }, [loading]);
  // useEffect(() => {
  //   // console.log("current location>>>", window.location.pathname);
  //   // setPath(window.location.pathname);
  //   alert("userId>>>", userId);
  // }, []);

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
