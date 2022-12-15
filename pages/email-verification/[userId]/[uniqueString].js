import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../../utils/api";
import styles from "../../../styles/LoginStyles/EmailVerification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

const VerifyEmail = () => {
  const router = useRouter();
  const { userId, uniqueString } = router.query;
  const [path, setPath] = useState("");
  // const { userId, uniqueString } = useParams();
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [loading, showLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      showLoading(false);
    }, 5000);
  }, []);
  useEffect(() => {
    // console.log("current location>>>", window.location.pathname);
    // setPath(window.location.pathname);
    // alert("userId>>>", userId);
  }, []);

  useEffect(() => {
    console.log("running special use effect");
    if (userId) {
      api
        .get(`/auth/getuserById/${userId}`)
        .then((res) => {
          console.log("response from get user by id", res.data);
          if (res.data.verified === true) {
            setIsAlreadyVerified(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  useEffect(() => {
    console.log("running user id", userId);
    if (userId) {
      api
        .get(`/auth/verify/${userId}/${uniqueString}`)
        .then((res) => {
          console.log("res from get", res);
          setSuccess(true);
        })
        .catch((err) => {
          console.log("error from get>", err);
          setSuccess(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      {!loading && (
        <>
          {/* {loading && <Loading />} */}
          <div className={styles.verifyYourAccountWrapper}>
            {/* <div>VerifyEmail</div>
      <h1>{uniqueString}</h1> */}
            {isAlreadyVerified ? (
              <div>
                <h1>
                  {" "}
                  Your email is already <span>verified</span>
                </h1>

                {/* <CheckCircleIcon /> */}
                <span>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <button onClick={() => router.push("/login")}>Login</button>
              </div>
            ) : (
              <div
              // className={
              //   success
              //     ? "email__verified__success__container"
              //     : "email__verified__failure__container"
              // }
              >
                {success ? (
                  <h1>
                    {" "}
                    Your email has been verified <span>successfully</span>
                  </h1>
                ) : (
                  <h1>
                    <span>
                      {" "}
                      Your email has not been verified due to some unknown error
                    </span>
                  </h1>
                )}

                {success ? (
                  <>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <button
                      className="form-submit"
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </button>
                  </>
                ) : (
                  // <CancelIcon />
                  // <h1>Cancel</h1>
                  <span style={{ borderColor: "gray" }}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: "#cc0000" }}
                    />
                  </span>
                )}
                {/* {success && (
              <Link to="/">
                {" "}
                <button>Continue </button>
              </Link>
            )} */}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default VerifyEmail;
