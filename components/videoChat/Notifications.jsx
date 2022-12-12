import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
// import { Button } from "@material-ui/core";
import styles from "../../styles/VideoChat/VideoChat.module.css";
import { useStateValue } from "../../StateProvider";
import { useRouter } from "next/router";

const Notifications = ({ receiverId, appointmentId }) => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const [{ user, isSomeOneCallingForMeeting }, dispatch] = useStateValue();
  const router = useRouter();
  useEffect(() => {
    console.log("call.isReceiving Call>>>", call.isReceivingCall);
  }, [call]);
  useEffect(() => {
    if (call.isReceivingCall) {
      dispatch({
        type: "SET_SOMEONE_CALLING_FOR_MEETING",
        isSomeOneCallingForMeeting: true,
      });
    }
    if (!callAccepted) {
      dispatch({
        type: "SET_SOMEONE_CALLING_FOR_MEETING",
        isSomeOneCallingForMeeting: false,
      });
    }
  }, [call, callAccepted]);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className={styles.video__call__notification__box}>
          <h1>{call.name} is calling:</h1>
          <button
            className={styles.video__call__answerCall__btn}
            onClick={() => {
              if (router?.asPath !== "/video-chat/[appointmentId]") {
                dispatch({
                  type: "SET_CALL_ANSWERED_OUTSIDE_VIDEO_PAGE",
                  callIsAnsweredOutsideVideoPage: true,
                });
                router.push("/video-chat/" + call?.appointmentId);
              } else {
                answerCall(receiverId);
              }
            }}
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
