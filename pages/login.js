import React, { useState, useEffect } from "react";
import styles from "../styles/LoginStyles/Login.module.css";
import AES from "crypto-js/aes";

import { loginUser, loginExpert } from "../Actions/userActions";
import { registerUser } from "../Actions/userActions";
import { useStateValue } from "../StateProvider";
import { useRouter } from "next/router";
import api from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = ({ setShowAuthForm, fromNavbar }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [formType, setFormType] = useState("signIn");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const handleForgetPasswordChange = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const [userType, setUserType] = useState("user");

  const [errors, setErrors] = useState({});
  const changeForm = () => {
    formType == "signIn" ? setFormType("signUp") : setFormType("signIn");
    setFName("");
    setLName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const submitForm = () => {
    console.log("running submission");
    let errs = {};
    if (email?.length < 1) {
      errs.email = "required";
    } else if (!validateEmail(email)) {
      errs.email = "Enter a valid email";
    }
    if (password?.length < 1) {
      errs.password = "required";
    }
    if (formType == "signUp") {
      if (fName?.length < 1) {
        errs.fName = "*";
      }
      if (lName?.length < 1) {
        errs.lName = "*";
      }
      if (confirmPassword?.length < 1) {
        errs.confirmPassword = "required*";
      }
      if (confirmPassword !== password) {
        errs.confirmPassword = "password does not match";
      }
    }
    setErrors(errs);
    console.log("errs", errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      console.log("formType", formType);
      if (formType == "signIn") {
        console.log("login data", email, password, dispatch);
        let userData = {
          email,
          password,
        };
        if (userType == "expert") {
          // alert("login as expert");
          loginExpert(userData, router, dispatch, fromNavbar, setShowAuthForm);
        } else
          loginUser(userData, router, dispatch, fromNavbar, setShowAuthForm);
      }
      if (formType == "signUp") {
        console.log(
          "signup data",
          fName,
          lName,
          email,
          password,
          confirmPassword
        );
        var pass = AES.encrypt(password, "ReddySoftwares123").toString();
        let userData = {
          firstName: fName,
          lastName: lName,
          email,
          password: pass,
        };
        registerUser(userData, router);
      }
    }
  };

  return (
    <div
      className={styles.login__page__wrapper}
      style={
        !fromNavbar
          ? {
              backgroundColor: "aliceblue",
            }
          : {}
      }
      onClick={(e) => {
        if (setShowAuthForm) {
          e.preventDefault();
          e.stopPropagation();
          setShowAuthForm(false);
        }
      }}
    >
      <div
        className={styles.login__form}
        onClick={(e) => {
          if (setShowAuthForm) {
            e.preventDefault();
            e.stopPropagation();
            setShowAuthForm(true);
          }
        }}
      >
        <h1>
          {formType == "signIn" ? "Sign In to " : "Sign Up to "}

          <span>
            Consult<span>Pro</span>
          </span>
        </h1>
        <div>
          {formType == "signUp" && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={fName}
                name="firstName"
                onChange={(e) => setFName(e.target.value)}
              />
              {errors?.fName && (
                <p className={styles.error__para}>{errors?.fName}</p>
              )}
              <input
                type="text"
                placeholder="Last Name"
                value={lName}
                name="lastName"
                onChange={(e) => setLName(e.target.value)}
              />
              {errors?.lName && (
                <p className={styles.error__para}>{errors?.lName}</p>
              )}
            </div>
          )}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors?.email && (
            <p className={styles.error__para}>{errors?.email}</p>
          )}
          {/* <div className={styles.show__password__container}>
            <input
              type="checkbox"
              onChange={() =>
                setUserType(userType == "user" ? "expert" : "user")
              }
              checked={userType == "expert"}
            />
            <p>Login as Expert</p>
          </div> */}
          <input
            type={showLoginPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors?.password && (
            <p className={styles.error__para}>{errors?.password}</p>
          )}
          {formType == "signUp" && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {errors?.confirmPassword && (
            <p className={styles.error__para}>{errors?.confirmPassword}</p>
          )}
          {formType == "signIn" && (
            <div className={styles.show__password__container}>
              <span onClick={handleForgetPasswordChange}>
                <FontAwesomeIcon
                  icon={showLoginPassword ? faEyeSlash : faEye}
                />
              </span>

              <p>Show Password</p>
            </div>
          )}

          {formType == "signIn" && (
            <div className={styles.radio__options__usertype}>
              <h1>Login as</h1>
              <div>
                <div onClick={() => setUserType("user")}>
                  <input type="radio" checked={userType == "user"} />
                  <labe>user</labe>
                </div>
                <div onClick={() => setUserType("expert")}>
                  <input type="radio" checked={userType == "expert"} />
                  <labe>expert</labe>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => submitForm()}>Continue</button>
          {formType == "signIn" && (
            <p onClick={() => router.push("/forgot-password")}>
              forget password?
            </p>
          )}
          <p onClick={() => changeForm()}>
            {" "}
            {formType == "signIn"
              ? "Don't have an account? sign up "
              : "Already have an account? sign in"}
          </p>
        </div>
      </div>
    </div>
  );
};
var validator = require("email-validator");
const validateEmail = (email) => {
  console.log("validating email>>>> ", email);
  let test;
  let length = email.length;
  let demail = email.slice(length - 4, length);
  console.log("demail>>>", demail);
  if (demail !== ".com") {
    return false;
  }
  let count = 0;
  let email2 = email.slice(0, length - 4);
  if (email2.includes(".com")) {
    return false;
  }
  // if (
  //   !email.includes("@gmail.com") &&
  //   !email.includes("@yahoo.com") &&
  //   !email.includes("@hotmail.com") &&
  //   !email.includes("@outlook.com")
  // ) {
  //   return false;
  // }
  if (!validator.validate(email)) {
    return false;
  }
  return true;
};

export default Login;
