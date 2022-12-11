import React, { useState } from "react";
import styles from "../../styles/homeStyles/LookingForMore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const LookingForMore = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const onSubmit = () => {
    setNameError("");
    setEmailError("");
    setMessageError("");
    let isErrorFound = false;
    if (name?.length < 1) {
      setNameError("required");
      isErrorFound = true;
    }
    if (email?.length < 1) {
      setEmailError("required");
      isErrorFound = true;
    } else if (!validateEmail(email)) {
      setEmailError("inapproprate email");
      isErrorFound = true;
    }
    if (message?.length < 1) {
      setMessageError("required");
      isErrorFound = true;
    } else if (message?.length < 10) {
      setMessageError("message is too short!");
      isErrorFound = true;
    }
    if (!isErrorFound) {
      // alert("form submitted");

      api
        .post("/auth/send-query-email", { name, email, message })
        .then((res) => {
          console.log("response from send query mail");
          Swal.fire("Sent Successfully!", "success");
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((err) => {
          console.log(err);
          swalWithBootstrapButtons.fire(
            "Registeration Unsuccessful!",
            "Sorry a user with email already exits",
            "error"
          );
        });
    }
  };

  return (
    <div className={styles.looking__for__more__wrapper}>
      <div>
        <h1>
          <FontAwesomeIcon icon={faMessage} />
          Contact Us
        </h1>
        <p>
          Contact us if you are facing any problem related to site working, any
          issue with specific expert or want some extra feature in our site.
          Your problem will be resolved and effort will be appreciated.{" "}
        </p>
      </div>
      <div>
        <div className={styles.contact__us__form}>
          <div>
            <label>Enter your name</label>
            <input
              type="text"
              placeholder="e.g John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className={styles.error__para}>{nameError}</p>}
          </div>
          <div>
            <label> Enter your email</label>
            <input
              value={email}
              type="text"
              placeholder="e.g abc@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={styles.error__para}>{emailError}</p>}
          </div>
          <div>
            <label>Write your message here</label>
            <textarea
              placeholder="here..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {messageError && (
              <p className={styles.error__para}>{messageError}</p>
            )}
          </div>
          <button onClick={() => onSubmit()}>Submit Message</button>
        </div>
      </div>
    </div>
  );
};

export default LookingForMore;
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
