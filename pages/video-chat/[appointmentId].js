import React, { useState, useEffect, useContext } from "react";

import Notifications from "../../components/videoChat/Notifications";
import Sidebar from "../../components/videoChat/Sidebar";
import VideoPlayer from "../../components/videoChat/VideoPlayer";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { SocketContext } from "../../SocketContext";
// import "./VideoChat.css";
import { useStateValue } from "../../StateProvider";
import api from "../../utils/api";
// import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/VideoChat/VideoChat.module.css";

const VideoCall = () => {
  const [{ user }, dispatch] = useStateValue();
  const { addUser, me, callEnded, leaveCall, setMe } =
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
    if (router?.isReady) {
      setAppointmentId(router.query?.appointmentId);
    }
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
          // setMe(user?.id);
          // api
          //   .get(
          //     "http://localhost:5000/api/users/getUserBy?userId=" + idOfReceiver
          //   )
          //   .then((res) => setReceiver(res.data[0]))
          //   .catch((error) => console.error(error));
        });
  }, [appointmentId]);

  useEffect(() => {
    //adding socket user
    console.log("me>>>>>>>>>>> ", me);
    addUser(user?.id);
  }, [user]);
  useEffect(() => {
    console.log(receiver?.name, receiverId, receiver?.userType);
  }, [receiver]);

  return (
    <div className={styles.video__call__container}>
      {/* <div className="video__call__navbar">
        <h3>Discuss your health face to face .</h3>
      </div> */}
      <VideoPlayer user={user} appointment={appointment}/>
      <Sidebar
        receiverId={receiverId}
        receiverName={receiver?.name}
        receiverType={receiver?.userType}
        appointmentId={appointmentId}
        user={user}
      ></Sidebar>
      <Notifications receiverId={receiverId} user={user} />
    </div>
  );
};

export default VideoCall;

// const videoCall = () => {
//   return (
//     <div>
//       <Navbar />
//       <VideoPlayer />
//       <Options>
//         <Notifications />
//       </Options>
//     </div>
//   );
// };

// export default videoCall;
