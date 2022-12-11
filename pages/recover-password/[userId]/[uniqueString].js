import React, { useState, useEffect } from "react";
// import "./ForgotPassword.css";
import styles from "../../../styles/LoginStyles/EmailVerification.module.css";
import api from "../../../utils/api";

import AES from "crypto-js/aes";
import { useRouter } from "next/router";

const RecoverPassword = () => {
  const router = useRouter();
  const { userId, uniqueString } = router.query;
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("none");

  const onSubmit = () => {
    console.log("submitting");

    var newPassword = AES.encrypt(password, "ReddySoftwares123").toString();

    api
      .get(
        `/auth/recovery/update-password/${userId}/${uniqueString}/${newPassword}`
      )
      .then((res) => {
        if (res.data) {
          console.log("response from updating password>> ", res.data);
          setResult("Password Updated Successfully. Go Login!");
          setResultType("success");
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        setResult("Error while updating password. Try again!");
        setResultType("error");
      });
  };

  return (
    <div className={styles.verifyYourAccountWrapper}>
      <br />
      <div>
        <h1>Recover you account</h1>
        <div>
          <p>Enter new password</p>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={() => onSubmit()}>Submit</button>
          <div
            className={
              resultType === "success"
                ? "result__box success"
                : resultType === "error"
                ? " result__box error"
                : "result__box"
            }
          >
            <>{result} </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
