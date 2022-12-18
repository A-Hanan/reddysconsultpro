import React, { useState, useEffect, useContext } from "react";
import Notifications from "../../components/videoChat/Notifications";
import Sidebar from "../../components/videoChat/Sidebar";
import VideoPlayer from "../../components/videoChat/VideoPlayer";
import { useRouter } from "next/router";
import { SocketContext } from "../../SocketContext";
import { useStateValue } from "../../StateProvider";
import api from "../../utils/api";
import styles from "../../styles/VideoChat/VideoChat.module.css";

const VideoCall = () => {
  const [{ user, callIsAnsweredOutsideVideoPage }, dispatch] = useStateValue();
  const { addUser, me, callEnded, leaveCall, setMe, answerCall } =
    useContext(SocketContext);
  useEffect(() => {
    let User = localStorage?.getItem("consult_pro_user")
      ? JSON.parse(localStorage?.getItem("consult_pro_user"))
      : null;
    dispatch({
      type: "SET_USER",
      user: User ? User : null,
    });
    addUser(User?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const userstate = useSelector((state) => state.loginUserReducer);
  //   const { currentUser } = userstate;

  const router = useRouter();
  const params = router?.query;
  // const appointmentId = params.appointmentId;
  const [receiver, setReceiver] = useState();
  const [appointment, setAppointment] = useState();
  const [receiverId, setReceiverId] = useState();
  const [appointmentId, setAppointmentId] = useState("");
  useEffect(() => {
    console.log("router", router);
    if (router?.isReady) {
      setAppointmentId(router.query?.appointmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    appointmentId &&
      api
        .get(`/appointment/getByAppointmentId/${appointmentId}`)
        .then((res) => {
          setAppointment(res.data);
          let idOfReceiver =
            user.userType === "expert" ? res.data.userId : res.data.expertId;
          setReceiverId(idOfReceiver);
          let rec =
            user.userType === "expert" ? res.data.user : res.data.expert;
          setReceiver(rec);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId]);

  useEffect(() => {
    //adding socket user
    console.log("me>>>>>>>>>>> ", me);
    addUser(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    console.log(receiver?.name, receiverId, receiver?.userType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver]);

  useEffect(() => {
    console.log("superrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    console.log(
      "callIsAnsweredOutsideVideoPage",
      callIsAnsweredOutsideVideoPage
    );
    console.log("receiverId", receiverId);
    if (callIsAnsweredOutsideVideoPage && receiverId) {
      answerCall(receiverId);
      dispatch({
        type: "SET_SOMEONE_CALLING_FOR_MEETING",
        isSomeOneCallingForMeeting: false,
      });
      dispatch({
        type: "SET_CALL_ANSWERED_OUTSIDE_VIDEO_PAGE",
        callIsAnsweredOutsideVideoPage: false,
      });
    }
  }, [callIsAnsweredOutsideVideoPage, receiverId]);
  return (
    <div className={styles.video__call__container}>
      {/* <div className="video__call__navbar">
        <h3>Discuss your health face to face .</h3>
      </div> */}
      <VideoPlayer user={user} appointment={appointment} />
      <Sidebar
        receiverId={receiverId}
        receiverName={receiver?.name}
        receiverType={receiver?.userType}
        appointmentId={appointmentId}
        user={user}
      ></Sidebar>
      <Notifications
        receiverId={receiverId}
        user={user}
        appointmentId={appointmentId}
      />
    </div>
  );
};

export default VideoCall;
