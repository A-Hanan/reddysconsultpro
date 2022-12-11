// import React, {createContext, useState, useRef, useEffect} from "react";
// import {io} from 'socket.io-client';
// import Peer from 'simple-peer';

// const SocketContext = createContext();

// const socket = io('http://localhost:5000');
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:8990");
//const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [showMyAudio, setShowMyAudio] = useState(true);
  const [showMyVideo, setShowMyVideo] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
       .getUserMedia({ video: true, audio: true })
      // .getUserMedia({ video: showMyVideo, audio: showMyAudio })
      .then((currentStream) => {
        setStream(currentStream);
        try {
          myVideo.current.srcObject = currentStream;
        } catch (err) {
          console.log(err);
        }

        // console.log(" myVideo.current.srcObject", myVideo.current.srcObject);
        // console.log(" myVideo.current", myVideo.current);
        // console.log(" myVideo", myVideo);
        // console.log(" currentStream", currentStream);
        // userVideo.current.srcObject = currentStream.streams[0];
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    socket.on("endCall", (res) => {
      // console.log("response of end call >>>> ", res);
      if (res === true) {
        setCallEnded(true);
      }
    });
  }, [name, showMyAudio, showMyVideo]);
  const addUser = (id) => {
    // console.log("socketContext>>>> ", id);
    socket.emit("addUser", id);
    // console.log("after socketContext");
  };
  const answerCall = (receiverId) => {
    setCallAccepted(true);
    console.log("accepting answer call");

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        receiverId: receiverId,
      });
      console.log("emitting answer call", data, call.from);
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      // console.log("current stream at peer stream", stream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    // console.log("id of receiver to be called>>>", id);
    try {
      peer.on("signal", (data) => {
        // console.log("data in peer>>> ", data);
        // console.log("me>>> ", me);
        // console.log("name>> ", name);
        // console.log("data while calling user", id, me, name, data);
        socket.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });
    } catch (err) {
      console.log("error while calling User>>> ", err);
    }

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log(" userVideo.current.srcObject", userVideo.current.srcObject);
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = (receiverId) => {
    setCallEnded(true);

    connectionRef.current.destroy();
    socket.emit("endCall", { receiverId: receiverId });

    // window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        addUser,
        setMe,
        showMyAudio,
        setShowMyAudio,
        showMyVideo,
        setShowMyVideo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
