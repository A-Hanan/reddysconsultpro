import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../SocketContext";
import Swal from "sweetalert2";
import { MicOff, Phone, PhoneDisabled } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { useRouter } from "next/router";

import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { useStateValue } from "../../StateProvider";
import api from "../../utils/api";
import styles from "../../styles/VideoChat/VideoChat.module.css";

const Sidebar = ({
  children,
  receiverId,
  receiverName,
  receiverType,
  appointmentId,
  user,
}) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    setCallEnded,
    showMyAudio,
    setShowMyAudio,
    showMyVideo,
    setShowMyVideo,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const router = useRouter();

  useEffect(() => {
    const setAndRun = () => {
      console.log(receiverId, receiverName, " at sidebar");
      // setName(receiverName);
      setName(
        user?.userType == "user"
          ? user?.firstName + " " + user?.lastName
          : user?.name
      );
      setIdToCall(receiverId);
    };
    setAndRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId, receiverName]);
  // useEffect(() => {
  //   // console.log("appointment id at sidebar: ", appointmentId);
  // });
  useEffect(() => {
    const setAndRun = async () => {
      if (callEnded === true) {
        leaveCall();

        //setting appointment status attended
        // if (callEnded == true) {
        // alert("call ended");
        Swal.fire(
          "Call ended successfully!",
          "Appointment Attended",
          "successfully"
        );
        const data = {
          appointmentId: appointmentId,
          status: "Attended",
        };
        api
          .put(`/appointment/update`, data)
          .then((res) => {
            console.log("appointment after updation>> ", res.data);

            router.push("/completed-appointments");
          })
          .catch((err) => console.log(err));

        // try {
        //   const data = {
        //     appointmentId: appointmentId,
        //     status: "Attented",
        //   };
        //   const res = axios.put(
        //     `http://localhost:5000/api/appointment/update`,
        //     data
        //   );
        // } catch (error) {
        //   console.log(error.message);
        // }
        // }
        /************************************ */
        // if (user.userRole === "1") {
        //   history.push(`/video-call/rating-and-review/${appointmentId}`);
        // } else {
        //   history.push("/doctor/appointment");
        // }
        //sending notification

        // axios
        //   .post(`http://localhost:5000/api/notifications/`, {
        //     receiverId: receiverId,
        //     text: `You have attended an Appointment successfully.`,
        //     read: false,
        //   })
        //   .then((res) => res)
        //   .catch((err) => console.log);
      }
    };
    setAndRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callEnded]);

  return (
    <div className={styles.video__call__options__container}>
      <div className={styles.video__call__options__container__buttons}>
        {!callEnded && (
          <>
            {/* <button
              className={styles.startCall__btn}
              onClick={() => setShowMyAudio(!showMyAudio)}
            >
              {showMyAudio ? <KeyboardVoiceIcon /> : <MicOffIcon />}

           
            </button>
            <button
              className={styles.startCall__btn}
              onClick={() => setShowMyVideo(!showMyVideo)}
            >
              {showMyVideo ? <PhotoCameraIcon /> : <NoPhotographyIcon />}

            
            </button> */}
            {callAccepted ? (
              <button
                onClick={() => leaveCall(receiverId)}
                className={styles.endCall__btn}
              >
                End Call
                <PhoneDisabled />
                {/* Hang Up */}
              </button>
            ) : (
              <button
                onClick={() => callUser(idToCall, appointmentId, receiverId)}
                className={styles.startCall__btn}
              >
                {user?.userType !== "expert"
                  ? "Invite Expert to join"
                  : "Invite your client to join"}
                <PhoneIcon />
              </button>
            )}
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
