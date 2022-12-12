import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";

//import React, { useContext } from 'react';

//import { SocketContext } from '../Context';
import styles from "../../styles/VideoChat/VideoChat.module.css";
const VideoPlayer = ({ user, appointment }) => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  // console.log("name", name);
  // console.log("callAccepted", callAccepted);
  // console.log("myVideo", myVideo);
  // console.log("userVideo", userVideo);
  //console.log("callEnded", callEnded);
  //console.log("stream>>>>>>>>>>>>>>>>>>>>>>>>", stream);
  // console.log("call", call);
  useEffect(() => {
    // console.log("call.name , name >", call.name, name);
  }, [name, call]);
  useEffect(() => {
    callAccepted &&
      console.log("ohhhhhhhhhhhh your call accepted", callAccepted);
    console.log("user video", userVideo);
  }, [callAccepted, userVideo]);
  return (
    <div className={styles.video__call__videoplayer__container}>
      {stream && (
        <div className={styles.self__screen}>
          <video playsInline muted ref={myVideo} autoPlay />
          {/* <h5>{name || "Name"}</h5> */}
          <h5>
            {user?.userType == "expert"
              ? user?.name
              : user?.firstName + " " + user?.lastName}
          </h5>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className={styles.screen}>
          <video playsInline ref={userVideo} autoPlay />
          {/* <h5>{call.name || "Name"}</h5> */}
          <h5>
            {user?.userType == "expert"
              ? appointment?.user?.firstName + " " + appointment?.user?.lastName
              : appointment?.user?.name}
          </h5>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

// const VideoPlayer = () => {
//     const { callAccepted, myVideo, userVideo, callEnded, stream} = useContext(SocketContext);

//     return (
//         <div>
//             { stream && (
//             <video playsInline muted ref={myVideo} autoPlay />
//             )}

//             { callAccepted && !callEnded && (
//             <video playsInline ref={userVideo } autoPlay />
//             )}
//         </div>
//     )
// }

//export default VideoPlayer
