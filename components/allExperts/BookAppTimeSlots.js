import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookAppointmentAction } from "../../Actions/bookAppointmentAction";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";
import styles from "../../styles/allExpertsStyles/BookAppointment.module.css";
import BookAppointmentModal from "./BookAppointmentModal";

const ampmToMinutesConverter = (time) => {
  var input = time,
    matches = input.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/),
    output =
      parseInt(matches[1]) +
      (matches[3] == "pm" ? 12 : 0) +
      ":" +
      matches[2] +
      ":00";
  if (time == "12:00 PM") {
    output = "12:00:00";
  }
  if (time == "12:30 PM") {
    output = "12:30:00";
  }
  const hms = output;
  // console.log("output>", output);
  const [hours, minutes, seconds] = hms.split(":");
  // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  // console.log("hours miutes", hours, minutes);
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return totalMinutes;
};
const simpleToMinutes = (time) => {
  const hms = time;
  // console.log("output>", output);
  const [hours, minutes, seconds] = hms.split(":");
  // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  // console.log("hours miutes", hours, minutes);
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return totalMinutes;
};

const BookApptimeSlots = ({ expert }) => {
  // const userstate = useSelector((state) => state.loginUserReducer);
  // const { currentUser } = userstate;

  const [{ user }, dispatch] = useStateValue();
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => setCurrentUser(user), [user]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [activeSlot, setActiveSlot] = useState("");
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    // "05:00 PM",
    // "05:30 PM",
    // "06:00 PM",
    // "06:30 PM",
    // "07:00 PM",
    // "07:30 PM",
    // "08:00 PM",
    // "08:30 PM",
    // "09:00 PM",
  ]);
  useEffect(() => {
    console.log("date", date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    console.log("expert", expert);
    console.log("user", user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, expert]);
  useEffect(() => {
    // console.log("date>", date);
    setDisabledSlots([...slots]);
    let date1 = date;
    let date2 = new Date();
    date1.setHours(0, 0, 0, 0);
    console.log("date after changing", date1);
    date2.setHours(0, 0, 0, 0);
    console.log("date1 and date2>", date1, date2, date1 < date2);
    if (date1 < date2) {
      console.log("disabled slots", disabledSlots);
      //remains same
    } else if (date1 > date2) {
      console.log("sjjjjjjjjjjjjjjjj");
      setDisabledSlots([]);
      let temp = [];

      const body = {
        expertId: expert?._id,
        status: "Confirmed",
        date: date1,
      };
      let a = 0;
      let b = 0;
      if (expert?.startAvailabilityTime && expert?.endAvailabilityTime) {
        a = simpleToMinutes(expert?.startAvailabilityTime);
        b = simpleToMinutes(expert?.endAvailabilityTime);
      }
      let temp22 = [];
      slots.forEach((slot) => {
        let exa = ampmToMinutesConverter(slot);

        // console.log("example >>>>", exa, a, b);
        if (exa < a || exa > b) {
          temp22.push(slot);
        } else {
          temp22.push("");
        }
      });
      console.log("disabled slots", temp22);
      setDisabledSlots(temp22);

      api.post("/appointment/specificAppointments", body).then((res) => {
        console.log("expert all appointments>", res.data);
        let disabledSlotsPro = [];
        if (res.data[0]) {
          // console.log("appointments>>>", res.data);

          slots.map((slot) => {
            let isFound = false;
            res.data.map((app) => {
              if (slot == app.appointmentTime) {
                temp.push(slot);
                isFound = true;
              }
            });

            if (!isFound) {
              temp.push("");
            }
          });
          console.log("disabledSlots", temp);
          /*** cobining diability fro both accordig to doctor availability time
           * + doctor already fixed appointment
           */
          let temp33 = [];
          slots.forEach((s, i) => {
            if (temp22[i] !== "" || temp[i] !== "") {
              temp33.push(s);
            } else {
              temp33.push("");
            }
          });
          setDisabledSlots(temp33);
        }
        // else {
        // handleSubmit("ok");
        // let a = 0;
        // let b = 0;
        // if (expert?.startAvailabilityTime && expert?.endAvailabilityTime) {
        //   a = simpleToMinutes(expert?.startAvailabilityTime);
        //   b = simpleToMinutes(expert?.endAvailabilityTime);
        // }
        // let temp22 = [];
        // slots.forEach((slot) => {
        //   let exa = ampmToMinutesConverter(slot);
        //   // console.log("example >>>>", exa, a, b);
        //   if (exa < a || exa > b) {
        //     temp22.push(slot);
        //   } else {
        //     temp22.push("");
        //   }
        // });
        // setDisabledSlots(temp22);
        // }
      });
    } else if (new Date().getHours() <= 15) {
      let temp = [];
      let a = 0;
      let b = 0;
      if (expert?.startAvailabilityTime && expert?.endAvailabilityTime) {
        a = simpleToMinutes(expert?.startAvailabilityTime);
        b = simpleToMinutes(expert?.endAvailabilityTime);
      }
      slots.forEach((slot) => {
        let m1 =
          parseInt(new Date().getHours()) * 60 +
          parseInt(new Date().getMinutes());
        let m2 = ampmToMinutesConverter(slot);
        let exa = ampmToMinutesConverter(slot);
        // console.log("example >>>>", exa, a, b);
        if (m2 < m1) {
          temp.push(slot);
        } else if (exa < a || exa > b) {
          temp.push(slot);
        } else {
          temp.push("");
        }
      });
      setDisabledSlots(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  useEffect(() => {
    console.log("disabled slots", disabledSlots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledSlots]);

  const selectSlot = (e) => {
    setActiveSlot(e.target.value);
    setTime(e.target.value);
    setShowModal(true);
  };

  return (
    <div className={styles.BookAppTimeSlots}>
      <div className={styles.date__selector__container}>
        <lable>Select Date</lable>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <div className={styles.time__selector__container}>
        <lable>Select Time</lable>
        <div className={styles.time__slots}>
          {slots.map((slot, i) => (
            <input
              key={i}
              className={
                disabledSlots[i] == slot
                  ? `${styles.slot} ${styles.disabled}`
                  : activeSlot == slot
                  ? `${styles.slot} ${styles.active}`
                  : `${styles.slot}`
              }
              value={slot}
              onClick={(e) => {
                if (disabledSlots[i] == slot) {
                  console.log("disabled");
                } else {
                  selectSlot(e);
                }
              }}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <BookAppointmentModal
          date={date}
          time={time}
          expert={expert}
          setShowModal={setShowModal}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default BookApptimeSlots;
