import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
// import { Button } from "@material-ui/core";
import styles from "../../styles/VideoChat/VideoChat.module.css";

const Notifications = ({ receiverId }) => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  useEffect(() => {
    console.log("call.isReceiving Call>>>", call.isReceivingCall);
  }, [call]);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className={styles.video__call__notification__box}>
          <h1>{call.name} is calling:</h1>
          <button
            className={styles.video__call__answerCall__btn}
            onClick={() => answerCall(receiverId)}
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
